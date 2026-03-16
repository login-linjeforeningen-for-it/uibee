'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X } from 'lucide-react';
import { FieldWrapper } from './shared';
export default function TagInput({ label, name, value = [], onChange, placeholder = 'Add...', error, className, disabled, required, info, description, textSize = 'sm', }) {
    const [inputValue, setInputValue] = useState('');
    function handleKeyDown(e) {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
            e.preventDefault();
            const val = inputValue.trim().replace(/,$/, '');
            if (val && !value.includes(val)) {
                const newValue = [...value, val];
                if (onChange)
                    onChange(newValue);
            }
            setInputValue('');
        }
        else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            const newValue = value.slice(0, -1);
            if (onChange)
                onChange(newValue);
        }
    }
    function removeTag(index) {
        if (disabled)
            return;
        const newValue = value.filter((_, i) => i !== index);
        if (onChange)
            onChange(newValue);
    }
    return (_jsxs(FieldWrapper, { label: label, name: name, required: required, info: info, description: description, error: error, className: className, textSize: textSize, children: [_jsxs("div", { className: `
                    flex flex-wrap gap-2 p-2 rounded-md bg-login-500/50 border border-login-500 
                    text-login-text min-h-10.5
                    focus-within:border-login focus-within:ring-1 focus-within:ring-login
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    ${error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : ''}
                `, children: [value.map((tag, index) => (_jsxs("span", { className: 'flex items-center gap-1 px-2 py-1 bg-login rounded text-sm text-white', children: [tag, !disabled && (_jsx("button", { type: 'button', onClick: () => removeTag(index), className: 'hover:text-red-200 transition-colors', children: _jsx(X, { size: 14 }) }))] }, index))), _jsx("input", { type: 'text', value: inputValue, required: required && value.length === 0, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, disabled: disabled, placeholder: value.length === 0 ? placeholder : '', className: 'flex-1 bg-transparent outline-none min-w-30 text-login-text placeholder:text-login-200' })] }), _jsx("input", { type: 'hidden', name: name, value: value.join(',') })] }));
}
