import type { Column } from 'uibee/components';
type TableProps = {
    data: object[];
    columns: Column[];
    menuItems?: (data: object, id: string) => React.ReactNode;
    redirectPath?: string | {
        path: string;
        key?: string;
    };
    variant?: 'default' | 'minimal';
    idKey?: string;
};
export default function Table({ data, columns, menuItems, redirectPath, variant, idKey }: TableProps): import("react").JSX.Element;
export {};
