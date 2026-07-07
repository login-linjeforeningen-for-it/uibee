//#region src/utils/auth/getDomain.ts
function getDomain(req) {
	return `${req.headers.get("x-forwarded-proto") ?? new URL(req.url).protocol.replace(":", "")}://${req.headers.get("host") ?? req.headers.get("x-forwarded-host") ?? new URL(req.url).host}`;
}
//#endregion
export { getDomain };
