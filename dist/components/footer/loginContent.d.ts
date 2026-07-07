import { FooterColumn, FooterSocialLink } from "./footer.js";

//#region src/components/footer/loginContent.d.ts
declare const loginAddress: FooterColumn;
declare const loginEmail: (email: string) => FooterColumn;
declare const loginCopyright: {
  readonly no: "Login - Linjeforeningen for IT, NO 811 940 372";
  readonly en: "Login - Association for IT, NO 811 940 372";
};
declare const loginSponsor: {
  readonly label: {
    readonly no: "Hovedsamarbeidspartner";
    readonly en: "Main partner";
  };
};
declare const loginSocialLinks: FooterSocialLink[];
//#endregion
export { type FooterSocialLink as LoginSocialLinkData, loginAddress, loginCopyright, loginEmail, loginSocialLinks, loginSponsor };