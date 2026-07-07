import { NextResponse } from "next/server.js";
import { AuthLogoutProps } from "uibee/utils";

//#region src/utils/auth/logout.d.ts
declare function AuthLogout({
  req,
  path
}: AuthLogoutProps): Promise<NextResponse<unknown>>;
//#endregion
export { AuthLogout as default };