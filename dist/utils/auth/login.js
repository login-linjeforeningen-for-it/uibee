import { getDomain } from "./getDomain.js";
import { NextResponse } from "next/server.js";
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
export { AuthLogin as default };
