import { AuthCallbackProps } from "uibee/utils";

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
export { authCallback as default };