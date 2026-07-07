//#region src/components/container/page.d.ts
type PageContainerProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};
declare function PageContainer({
  title,
  children,
  className,
  innerClassName
}: PageContainerProps): import("react").JSX.Element;
//#endregion
export { PageContainer as default };