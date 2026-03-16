'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useClickOutside } from '../../hooks';
import { ChevronDown, X, Search } from 'lucide-react';
import { FieldWrapper } from './shared';
export default function Select({ label, name, value, onChange, options, error, className, disabled, required, placeholder = 'Select an option', info, description, clearable = true, searchable = true, }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(options.find(opt => opt.value === value));
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);
    useEffect(() => {
        setSelectedOption(options.find(opt => opt.value === value));
    }, [value, options]);
    const containerRef = useClickOutside(() => setIsOpen(false));
    function handleSelect(option) {
        if (disabled)
            return;
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        }
    }
    function handleClear(e) {
        e.stopPropagation();
        if (disabled)
            return;
        setSelectedOption(undefined);
        if (onChange) {
            onChange(null);
        }
    }
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs(FieldWrapper, { label: label, name: name, required: required, info: info, description: description, error: error, className: className, children: [_jsxs("div", { className: 'relative', ref: containerRef, children: [_jsxs("button", { type: 'button', onClick: () => !disabled && setIsOpen(!isOpen), disabled: disabled, "aria-haspopup": 'listbox', "aria-expanded": isOpen, "aria-labelledby": label ? undefined : name, className: `
                        w-full rounded-md bg-login-500/50 border border-login-500 
                        text-login-text text-left
                        focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                        disabled:opacity-50 disabled:cursor-not-allowed
                        h-10.5 py-2 pl-3 pr-10
                        transition-all duration-200
                        flex items-center justify-between
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                        ${!selectedOption ? 'text-login-200' : ''}
                    `, title: label, children: [_jsxs("div", { className: 'flex items-center gap-2 truncate', children: [selectedOption?.image && (_jsx(Image, { src: selectedOption.image, alt: '', width: 30, height: 20, className: 'rounded-xs object-cover shrink-0' })), _jsx("span", { className: 'truncate', children: selectedOption ? selectedOption.label : placeholder })] }), _jsxs("div", { className: 'absolute inset-y-0 right-0 flex items-center px-2 gap-1', children: [clearable && selectedOption && !disabled && (_jsx("div", { role: 'button', onClick: handleClear, className: `
                                    p-1 hover:bg-login-500 rounded-full text-login-200
                                    hover:text-red-400 transition-colors cursor-pointer
                                `, title: 'Clear selection', children: _jsx(X, { className: 'w-3 h-3' }) })), _jsx("div", { className: `
                            text-login-200 pointer-events-none
                            transition-transform duration-200
                            ${isOpen ? 'rotate-180' : ''}
                        `, children: _jsx(ChevronDown, { className: 'w-4 h-4' }) })] })] }), isOpen && (_jsxs("div", { className: `
                        absolute z-50 w-full mt-1 bg-login-600 border border-login-500
                        rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col
                    `, children: [searchable && (_jsx("div", { className: 'p-2 sticky top-0 bg-login-600 border-b border-login-500 z-10', children: _jsxs("div", { className: 'relative', children: [_jsx(Search, { className: 'absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-login-200' }), _jsx("input", { type: 'text', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: 'Search...', autoFocus: true, className: `
                                            w-full bg-login-500/50 border border-login-500 rounded-md 
                                            py-1.5 pl-9 pr-3 text-sm text-login-text 
                                            focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                                        ` })] }) })), _jsx("div", { className: 'overflow-auto noscroll', children: filteredOptions.length > 0 ? (_jsx("ul", { className: 'py-1', role: 'listbox', children: filteredOptions.map((option) => (_jsx("li", { role: 'option', "aria-selected": selectedOption?.value === option.value, children: _jsxs("button", { type: 'button', onClick: () => handleSelect(option), className: `
                                                    w-full text-left px-3 py-2 text-sm
                                                    hover:bg-login-500 transition-colors duration-150
                                                    flex items-center gap-2
                                                    ${selectedOption?.value === option.value ? 'bg-login-500 text-login' : 'text-login-text'}
                                                `, children: [option.image && (_jsx(Image, { src: option.image, alt: '', width: 75, height: 25, className: 'rounded-md object-cover shrink-0' })), _jsx("span", { className: 'truncate', children: option.label })] }) }, option.value))) })) : (_jsx("div", { className: 'px-3 py-2 text-sm text-login-200', children: searchTerm ? 'No results found' : 'No options available' })) })] }))] }), _jsx("input", { type: 'hidden', name: name, value: selectedOption?.value || '', required: required })] }));
}
