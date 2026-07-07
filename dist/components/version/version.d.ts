//#region src/components/version/version.d.ts
type VersionTagProps = {
  version?: string;
  url?: string;
  className?: string;
};
declare function VersionTag({
  version,
  url,
  className
}: VersionTagProps): import("react").JSX.Element | undefined;
//#endregion
export { VersionTag as default };