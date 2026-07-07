import { getDomain } from "./getDomain.js";
import { NextResponse } from "next/server.js";
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
export { AuthLogout as default };
