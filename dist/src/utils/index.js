'use client';
import { NextResponse } from "next/server.js";
//#region src/utils/LogoConsoleOutput/LogoConsoleOutput.ts
function LogoConsoleOutput() {
	const chromeStr = "%c███████╗                              ███████╗\n██╔════╝                              ╚════██║\n██║%c ██╗     ██████╗  ██████╗ ██╗███╗   ██╗ %c██║\n╚═╝%c ██║    ██╔═══██╗██╔════╝ ██║████╗  ██║ %c╚═╝%c\n    ██║    ██║   ██║██║  ███╗██║██╔██╗ ██║\n    ██║    ██║   ██║██║   ██║██║██║╚██╗██║\n%c██╗%c ██████╗╚██████╔╝╚██████╔╝██║██║ ╚████║ %c██╗\n██║%c ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝ %c██║\n███████╗%c                              %c███████║\n╚══════╝                              ╚══════╝%c\n\n       - Laget av TekKom med 🍕 og ❤️";
	const safariStr = "\n%c███████╗																											  ███████╗\n██╔═════╝																												╚════██║\n██║%c   ██╗				  ██████╗	 	 ╔██████╗	  ██╗    	 ███╗ 		   ██╗%c	  ██║\n  ╚═╝%c 	██║			  ██╔════██╗	 ██╔════╝	  ██║    	 ████╗	   ██║%c	   ╚═╝%c\n    		██║			  ██║			   ██║	 ██║	  ███╗    ██║		 ██╔██╗    ██║\n    		██║			  ██║			   ██║	 ██║		 ██║    ██║		 ██║╚██╗  ██║\n%c██╗%c   ██████╗	╚██████╝		 ╚██████╝	  ██║      ██║		 ╚███║ 	  %c██╗\n██║%c	  ╚═════╝		  ╚════╝				╚═════╝		   ╚═╝		 ╚═╝		  ╚═══╝		  %c██║\n███████╗%c																											 %c███████║\n   ╚══════╝																												╚══════╝%c\n\n													- Laget av TekKom med 🍕 og ❤️";
	let str = "";
	if (navigator.userAgent.indexOf("Chrome") != -1) str = chromeStr;
	else if (navigator.userAgent.indexOf("Firefox") != -1) str = chromeStr;
	else if (navigator.userAgent.indexOf("Safari") != -1) str = safariStr;
	else return console.log("Login - Linjeforeningen for IT");
	console.log(str, "color: #fd8738", "", "color: #fd8738", "", "color: #fd8738", "", "color: #fd8738", "", "color: #fd8738", "", "color: #fd8738", "", "color: #fd8738", "");
}
//#endregion
//#region src/utils/auth/getDomain.ts
function getDomain(req) {
	return `${req.headers.get("x-forwarded-proto") ?? new URL(req.url).protocol.replace(":", "")}://${req.headers.get("host") ?? req.headers.get("x-forwarded-host") ?? new URL(req.url).host}`;
}
//#endregion
//#region src/utils/auth/login.ts
async function AuthLogin({ req, clientID, redirectPath, authURL }) {
	const domain = getDomain(req);
	const state = Math.random().toString(36).substring(5);
	const authQueryParams = new URLSearchParams({
		client_id: clientID,
		redirect_uri: `${domain}${redirectPath}`,
		response_type: "code",
		scope: "openid profile email",
		state
	}).toString();
	return NextResponse.redirect(`${authURL}?${authQueryParams}`);
}
//#endregion
//#region src/utils/auth/callback.ts
async function authCallback({ req, tokenURL, clientID, clientSecret, redirectPath, userInfoURL, tokenRedirectPath }) {
	const domain = getDomain(req);
	const searchParams = new URL(req.url).searchParams;
	if (!searchParams) return NextResponse.json({ error: "No search parameters found." }, { status: 400 });
	const code = searchParams.get("code");
	if (!code) return NextResponse.json({ error: "No authorization code found." }, { status: 400 });
	try {
		const tokenResponse = await fetch(tokenURL, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				client_id: clientID,
				client_secret: clientSecret,
				code,
				redirect_uri: `${domain}${redirectPath}`,
				grant_type: "authorization_code"
			}).toString()
		});
		const tokenResponseBody = await tokenResponse.text();
		if (!tokenResponse.ok) return new Response(JSON.stringify(`Failed to obtain token: ${tokenResponseBody}`), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
		const token = JSON.parse(tokenResponseBody);
		const userInfoResponse = await fetch(userInfoURL, { headers: { Authorization: `Bearer ${token.access_token}` } });
		if (!userInfoResponse.ok) {
			const userInfoError = await userInfoResponse.text();
			return new Response(`No user info found: ${userInfoError}`, {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		const userInfo = await userInfoResponse.json();
		const redirectUrl = new URL(`${domain}${tokenRedirectPath}`);
		redirectUrl.search = new URLSearchParams({
			id: userInfo.sub,
			name: userInfo.name,
			username: userInfo.nickname,
			email: userInfo.email,
			groups: userInfo.groups.join(","),
			access_token: token.access_token
		}).toString();
		return NextResponse.redirect(redirectUrl.toString());
	} catch (err) {
		console.error("Error during OAuth flow:", err.message);
		return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
	}
}
//#endregion
//#region src/utils/auth/token.ts
async function AuthToken({ req, redirectPath }) {
	const domain = getDomain(req);
	const url = new URL(req.url);
	const token = url.searchParams.get("access_token");
	const btg = url.searchParams.get("btg");
	const redirectCookie = req.cookies.get("redirect_after_login");
	const redirect = redirectCookie ? redirectCookie.value : redirectPath || "/";
	if (!token) return NextResponse.json({ error: "No access token provided" }, { status: 400 });
	if (btg) return NextResponse.redirect(new URL(redirect, domain));
	const accessToken = url.searchParams.get("access_token");
	const userID = url.searchParams.get("id");
	const username = url.searchParams.get("name");
	const userNickname = url.searchParams.get("username");
	const userEmail = url.searchParams.get("email");
	const userGroups = url.searchParams.get("groups");
	const response = NextResponse.redirect(new URL(redirect, domain));
	response.cookies.set("access_token", accessToken);
	response.cookies.set("user_id", userID);
	response.cookies.set("user_name", username);
	response.cookies.set("user_nickname", userNickname);
	response.cookies.set("user_email", userEmail);
	response.cookies.set("user_groups", userGroups);
	if (redirectCookie) response.cookies.delete("redirect_after_login");
	return response;
}
//#endregion
//#region src/utils/auth/logout.ts
async function AuthLogout({ req, path }) {
	const domain = getDomain(req);
	const response = NextResponse.redirect(new URL(path || "/", domain));
	[
		"access_token",
		"user_id",
		"user_name",
		"user_nickname",
		"user_email",
		"user_groups"
	].forEach((cookieName) => {
		response.cookies.delete(cookieName);
	});
	return response;
}
//#endregion
export { LogoConsoleOutput, authCallback, AuthLogin as authLogin, AuthLogout as authLogout, AuthToken as authToken };
