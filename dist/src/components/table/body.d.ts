import React from 'react';
import type { Column } from 'uibee/components';
type BodyProps = {
    list: object[];
    columns: Column[];
    menuItems?: (data: object, id: string) => React.ReactNode;
    redirectPath?: string | {
        path: string;
        key?: string;
    };
    variant?: 'default' | 'minimal';
    idKey?: string;
};
export default function Body({ list, columns, menuItems, redirectPath, variant, idKey }: BodyProps): React.JSX.Element;
export {};
