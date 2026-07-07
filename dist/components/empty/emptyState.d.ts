import { ElementType, ReactNode } from "react";

//#region src/components/empty/emptyState.d.ts
type EmptyStateProps = {
  icon?: ElementType;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};
declare function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps): import("react").JSX.Element;
//#endregion
export { EmptyState as default };