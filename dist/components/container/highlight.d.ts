//#region src/components/container/highlight.d.ts
declare function Highlight({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}): import("react").JSX.Element;
//#endregion
export { Highlight as default };