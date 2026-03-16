import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldWrapper, InputLabel } from './shared';
export default function Radio(props) {
    const { options, onChange, value, label, description, error, info, name, className, textSize = 'sm', ...rest } = props;
    return (_jsx(FieldWrapper, { label: label, name: name, required: rest.required, info: info, description: description, error: error, textSize: textSize, className: className, children: _jsx("div", { className: 'flex flex-col gap-2', children: options.map((option) => (_jsx(RadioItem, { name: name, value: option.value, label: option.label, checked: value === option.value, disabled: rest.disabled, onChange: () => {
                    if (onChange)
                        onChange(option.value);
                }, className: 'mb-0' }, option.value))) }) }));
}
function RadioItem(props) {
    const { name, label, error, ...inputProps } = props;
    const { value } = inputProps;
    const id = `${name}-${value}`;
    return (_jsxs("div", { className: 'flex items-center gap-2', children: [_jsxs("div", { className: 'relative w-5 h-5 shrink-0', children: [_jsx("input", { ...inputProps, id: id, name: name, type: 'radio', className: `
                        peer appearance-none rounded-full border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-2 focus:ring-login/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-200
                        w-5 h-5 absolute inset-0
                        ${error ? 'border-red-500' : ''}
                    ` }), _jsx("div", { className: `
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-2 h-2 rounded-full bg-white pointer-events-none opacity-0
                    peer-checked:opacity-100 transition-opacity duration-200
                ` })] }), label && (_jsx(InputLabel, { label: label, name: name, disabled: inputProps.disabled, className: 'select-none cursor-pointer' }))] }));
}
