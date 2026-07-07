import { Language } from "uibee/components";

//#region src/components/toggle/language.d.ts
declare function LanguageToggle({
  language
}: {
  language?: Language;
}): import("react").JSX.Element;
//#endregion
export { LanguageToggle as default };