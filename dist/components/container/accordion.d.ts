import { ReactNode } from "react";

//#region src/components/container/accordion.d.ts
type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};
type AccordionGroupProps = {
  children: ReactNode;
  className?: string;
};
declare function AccordionGroup({
  children,
  className
}: AccordionGroupProps): import("react").JSX.Element;
declare function Accordion({
  title,
  children,
  defaultOpen,
  className
}: AccordionProps): import("react").JSX.Element;
//#endregion
export { AccordionGroup, Accordion as default };