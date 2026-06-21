import type { Column } from 'uibee/components';
type HeaderProps = {
    columns: Column[];
    hideMenu?: boolean;
    variant?: 'default' | 'minimal';
};
export default function Header({ columns, hideMenu, variant }: HeaderProps): import("react").JSX.Element;
export {};
