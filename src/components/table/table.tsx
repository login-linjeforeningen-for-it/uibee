'use client'

import Body from './body'
import Header from './header'
import type { Column } from 'uibee/components'

type TableProps = {
    data: object[]
    columns: Column[]
    menuItems?: (data: object, id: string) => React.ReactNode
    redirectPath?: string | { path: string, key?: string }
    variant?: 'default' | 'minimal'
    idKey?: string
}

export default function Table({ data, columns, menuItems, redirectPath, variant = 'default', idKey }: TableProps) {
    if (data.length === 0) {
        return <div className='p-4 text-center text-login-200'>No data found</div>
    }

    return (
        <div className={`
            flex-1 flex flex-col min-h-0 overflow-x-auto overflow-y-hidden h-full w-full
            ${variant === 'default' ? 'bg-login-500/50 rounded-lg shadow border border-login-600' : ''}
            ${variant === 'minimal' ? 'bg-transparent' : ''}
        `}>
            <table className='min-w-full w-max divide-y divide-login-600 flex flex-col flex-1 min-h-0'>
                <Header
                    columns={columns}
                    hideMenu={!menuItems}
                    variant={variant}
                />
                <Body
                    list={data}
                    columns={columns}
                    menuItems={menuItems}
                    redirectPath={redirectPath}
                    variant={variant}
                    idKey={idKey}
                />
            </table>
        </div>
    )
}
