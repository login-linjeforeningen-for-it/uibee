import { Components } from "react-markdown";

//#region src/components/markdownrender/markdownRender.d.ts
declare function MarkdownRender({
  MDstr,
  components,
  className,
  size
}: {
  MDstr: string;
  components?: Components;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
}): import("react").JSX.Element;
//#endregion
export { MarkdownRender as default };