//#region src/components/inputs/fileInput.d.ts
type FileInputProps = {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  className?: string;
};
declare function FileInput({
  name,
  label,
  accept,
  multiple,
  onChange,
  className
}: FileInputProps): import("react").JSX.Element;
//#endregion
export { FileInput as default };