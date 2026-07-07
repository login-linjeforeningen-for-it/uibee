import { NextResponse } from "next/server.js";
import { AuthTokenProps } from "uibee/utils";

//#region src/utils/auth/token.d.ts
declare function AuthToken({
  req,
  redirectPath
}: AuthTokenProps): Promise<NextResponse<unknown>>;
//#endregion
export { AuthToken as default };