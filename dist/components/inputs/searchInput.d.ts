//#region src/components/inputs/searchInput.d.ts
interface SearchInputProps {
  placeholder?: string;
  variant?: 'default' | 'minimal';
}
declare function SearchInput({
  placeholder,
  variant
}: SearchInputProps): import("react").JSX.Element;
//#endregion
export { SearchInput as default };