import { NextResponse } from "next/server.js";
import { AuthLoginProps } from "uibee/utils";

//#region src/utils/auth/login.d.ts
declare function AuthLogin({
  req,
  clientID,
  redirectPath,
  authURL
}: AuthLoginProps): Promise<NextResponse<unknown>>;
//#endregion
export { AuthLogin as default };