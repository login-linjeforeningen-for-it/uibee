import { LoginPageProps } from "uibee/components";

//#region src/components/login/loginPage.d.ts
declare function LoginPage({
  title,
  description,
  redirectPath,
  version,
  btg,
  handleSubmit,
  guestRedirectPath,
  guestText
}: LoginPageProps): import("react").JSX.Element;
//#endregion
export { LoginPage as default };