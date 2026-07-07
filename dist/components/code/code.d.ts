import { ReactNode } from "react";

//#region src/components/code/code.d.ts
type CodeProps = {
  children: ReactNode;
  className?: string;
};
declare function Code({
  children,
  className
}: CodeProps): import("react").JSX.Element;
type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
};
declare function CodeBlock({
  code,
  language,
  className
}: CodeBlockProps): import("react").JSX.Element;
//#endregion
export { Code, CodeBlock };