//#region src/components/inputs/toggle.d.ts
type ToggleOption<T> = {
  value: T;
  label?: string;
  text?: string;
  icon?: React.ReactNode;
};
type ToggleProps<T> = {
  value: T;
  onChange: (value: T) => void;
  left: ToggleOption<T>;
  right: ToggleOption<T>;
};
declare function Toggle<T>({
  value,
  onChange,
  left,
  right
}: ToggleProps<T>): import("react").JSX.Element;
//#endregion
export { Toggle as default };