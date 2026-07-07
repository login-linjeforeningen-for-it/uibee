import { ReactNode } from "react";

//#region src/components/footer/footer.d.ts
type Lang = 'no' | 'en';
type BilingualString = string | {
  no: string;
  en: string;
};
type FooterColumn = {
  heading: BilingualString;
  items: {
    label: BilingualString;
    href?: string;
  }[];
};
type FooterSocialLink = {
  title: string;
  href: string;
  icon: ReactNode;
  hoverClass?: string;
};
type FooterProps = {
  logo: ReactNode;
  sponsor?: {
    node: ReactNode;
    label?: BilingualString;
  };
  columns?: FooterColumn[];
  socialLinks?: FooterSocialLink[];
  copyright: BilingualString;
  version?: {
    tag: string;
    href: string;
  };
  lang?: Lang;
  className?: string;
};
declare function Footer({
  logo,
  sponsor,
  columns,
  socialLinks,
  copyright,
  version,
  lang,
  className
}: FooterProps): import("react").JSX.Element;
//#endregion
export { BilingualString, FooterColumn, FooterProps, FooterSocialLink, Lang, Footer as default };