//#region src/components/container/pulseDot.d.ts
type PulseDotVariant = 'online' | 'offline' | 'warning' | 'unknown';
type PulseDotProps = {
  variant?: PulseDotVariant;
  size?: 'sm' | 'md' | 'lg';
};
declare function PulseDot({
  variant,
  size
}: PulseDotProps): import("react").JSX.Element;
//#endregion
export { PulseDot as default };