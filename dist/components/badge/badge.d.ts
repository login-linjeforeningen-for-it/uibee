//#region src/components/badge/badge.d.ts
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'amber' | 'violet' | 'blue' | 'emerald' | 'orange';
type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
};
declare function Badge({
  text,
  variant,
  size,
  className
}: BadgeProps): import("react").JSX.Element;
//#endregion
export { Badge as default };