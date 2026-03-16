import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectionWrapper } from './shared';
export default function Radio(props) {
    const { name, label, error, info, description, className, ...inputProps } = props;
    const { value } = inputProps;
    const id = `${name}-${value}`;
    return (_jsx(SelectionWrapper, { label: label, name: id, required: inputProps.required, info: info, description: description, error: error, className: className, disabled: inputProps.disabled, children: _jsxs("div", { className: 'relative flex items-center', children: [_jsx("input", { ...inputProps, id: id, name: name, type: 'radio', className: `
                        peer appearance-none h-5 w-5 rounded-full border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-2 focus:ring-login/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-200
                        ${error ? 'border-red-500' : ''}
                    ` }), _jsx("div", { className: `
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-2 h-2 rounded-full bg-white pointer-events-none opacity-0
                    peer-checked:opacity-100 transition-opacity duration-200
                ` })] }) }));
}
