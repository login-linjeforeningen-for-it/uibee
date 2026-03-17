import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Header({ columns, hideMenu, variant = 'default' }) {
    const [column, setColumn] = useState(columns[0]?.key || '');
    const [order, setOrder] = useState('asc');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchParams.get('order') !== order ||
            searchParams.get('column') !== column) {
            params.set('order', order);
            params.set('column', column);
            params.set('page', '1');
            router.push(`${pathname}?${params.toString()}`);
        }
    }, [order, column, pathname, router, searchParams]);
    function handleChange(key) {
        setColumn(key);
        setOrder((prev) => (key === column && prev === 'asc' ? 'desc' : 'asc'));
    }
    return (_jsx("thead", { className: `
            block w-full
            ${variant === 'default' ? 'bg-login-700' : 'bg-transparent border-b border-login-600'}
        `, children: _jsxs("tr", { className: 'flex w-full divide-x divide-transparent', children: [columns.map((col) => {
                    const key = col.key;
                    const value = col.label || (key.length < 3
                        ? key.toUpperCase()
                        : `${key[0].toUpperCase()}${key
                            .slice(1)
                            .replaceAll('_', ' ')}`);
                    return (_jsx("th", { className: `
                                flex-1 min-w-0 px-6 py-3 text-xs font-medium uppercase tracking-wider text-left
                                ${variant === 'default' ? 'text-login-200' : 'text-login-100'}
                                ${variant === 'minimal' ? 'px-4!' : ''}
                            `, children: _jsxs("button", { className: 'flex w-full min-w-0 flex-row items-center gap-2 group uppercase whitespace-nowrap', onClick: () => handleChange(key), children: [_jsx("span", { className: 'min-w-0 truncate', children: value }), _jsx("span", { className: 'flex flex-col', children: column === key ? (order === 'asc' ? (_jsx(ChevronUp, { className: 'h-4 w-4' })) : (_jsx(ChevronDown, { className: 'h-4 w-4' }))) : (_jsx(ChevronUp, { className: 'h-4 w-4 stroke-login-200 opacity-0 group-hover:opacity-100' })) })] }) }, key));
                }), !hideMenu && _jsx("th", { className: 'shrink-0 w-16 px-6 py-3' })] }) }));
}
