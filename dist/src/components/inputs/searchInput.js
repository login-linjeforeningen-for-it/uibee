'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import Input from './input';
export default function SearchInput({ placeholder = 'Search...', variant = 'default' }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    useEffect(() => {
        const currentQ = searchParams.get('q') || '';
        setSearchValue(currentQ);
    }, [searchParams]);
    function handleSearch(value) {
        setSearchValue(value);
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
            params.set('q', value.trim());
        }
        else {
            params.delete('q');
        }
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch(searchValue);
        }
    }
    function handleChange(e) {
        setSearchValue(e.target.value);
    }
    if (variant === 'minimal') {
        return (_jsxs("div", { className: 'relative', children: [_jsx(Search, { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5' }), _jsx("input", { type: 'text', value: searchValue, onChange: (e) => setSearchValue(e.target.value), onKeyDown: handleKeyDown, onBlur: () => handleSearch(searchValue), placeholder: placeholder, className: 'pl-10 pr-4 py-2 border-b outline-none w-64' })] }));
    }
    else {
        _jsx(Input, { name: 'search', icon: _jsx(Search, { className: 'w-5 h-5' }), value: searchValue, onChange: handleChange, onKeyDown: handleKeyDown, onBlur: () => handleSearch(searchValue), placeholder: placeholder });
    }
}
