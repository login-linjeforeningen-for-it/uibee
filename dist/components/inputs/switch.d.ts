//#region src/components/inputs/switch.d.ts
type SwitchProps = Omit<React.ComponentProps<'input'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  description?: string;
  className?: string;
  switchOnly?: boolean;
  textSize?: 'sm' | 'md';
};
declare function Switch(props: SwitchProps): import("react").JSX.Element;
//#endregion
export { SwitchProps, Switch as default };