import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from 'lucide-react';
import { FieldWrapper, InputLabel } from './shared';
export default function Checkbox(props) {
    const { options, onChange, value, label, description, error, info, name, className, ...rest } = props;
    const selectedValues = Array.isArray(value) ? value : [];
    return (_jsx(FieldWrapper, { label: label, name: name, required: rest.required, info: info, description: description, error: error, className: className, children: _jsx("div", { className: 'flex flex-col gap-2', children: options.map((option) => (_jsx(CheckboxItem, { name: name, value: option.value, label: option.label, checked: selectedValues.includes(option.value), disabled: rest.disabled, onChange: (e) => {
                    if (!onChange)
                        return;
                    const isChecked = e.target.checked;
                    let newValues = [...selectedValues];
                    if (isChecked) {
                        newValues.push(option.value);
                    }
                    else {
                        newValues = newValues.filter((v) => v !== option.value);
                    }
                    onChange(newValues);
                }, className: 'mb-0' }, option.value))) }) }));
}
function CheckboxItem(props) {
    const { name, label, error, ...inputProps } = props;
    const id = inputProps.value ? `${name}-${inputProps.value}` : name;
    return (_jsxs("div", { className: 'flex items-center gap-2', children: [_jsxs("div", { className: 'relative w-5 h-5 shrink-0', children: [_jsx("input", { ...inputProps, id: id, name: name, type: 'checkbox', className: `
                        peer appearance-none rounded border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-2 focus:ring-login/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-200
                        w-5 h-5 absolute inset-0
                        ${error ? 'border-red-500' : ''}
                    ` }), _jsx(Check, { className: `
                        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-3.5 h-3.5 pointer-events-none text-white opacity-0
                        peer-checked:opacity-100 transition-opacity duration-200
                    ` })] }), label && (_jsx(InputLabel, { label: label, name: name, className: 'select-none cursor-pointer' }))] }));
}
