
import { NextResponse } from "next/server.js";
import { AuthCallbackProps, AuthLoginProps, AuthLogoutProps, AuthTokenProps } from "uibee/utils";

//#region src/utils/LogoConsoleOutput/LogoConsoleOutput.d.ts
declare function LogoConsoleOutput(): void;
//#endregion
//#region src/utils/auth/login.d.ts
declare function AuthLogin({
  req,
  clientID,
  redirectPath,
  authURL
}: AuthLoginProps): Promise<NextResponse<unknown>>;
//#endregion
//#region src/utils/auth/callback.d.ts
declare function authCallback({
  req,
  tokenURL,
  clientID,
  clientSecret,
  redirectPath,
  userInfoURL,
  tokenRedirectPath
}: AuthCallbackProps): Promise<Response>;
//#endregion
//#region src/utils/auth/token.d.ts
declare function AuthToken({
  req,
  redirectPath
}: AuthTokenProps): Promise<NextResponse<unknown>>;
//#endregion
//#region src/utils/auth/logout.d.ts
declare function AuthLogout({
  req,
  path
}: AuthLogoutProps): Promise<NextResponse<unknown>>;
//#endregion
export { LogoConsoleOutput, authCallback, AuthLogin as authLogin, AuthLogout as authLogout, AuthToken as authToken };