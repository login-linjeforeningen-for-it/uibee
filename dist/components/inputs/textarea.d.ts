//#region src/components/inputs/textarea.d.ts
type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  info?: string;
  description?: string;
  type?: 'markdown' | 'json' | 'text';
  textSize?: 'sm' | 'md';
};
declare function Textarea(props: TextareaProps): import("react").JSX.Element;
//#endregion
export { TextareaProps, Textarea as default };