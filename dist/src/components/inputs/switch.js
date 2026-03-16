import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectionWrapper } from './shared';
export default function Switch(props) {
    const { name, label, error, info, description, className, switchOnly, ...inputProps } = props;
    return (_jsx(SelectionWrapper, { label: label, name: name, required: inputProps.required, info: info, description: description, error: error, hideError: switchOnly, className: className, disabled: inputProps.disabled, children: _jsxs("label", { className: `relative inline-flex items-center cursor-pointer ${switchOnly ? 'h-fit' : 'h-10.5'}`, children: [_jsx("input", { ...inputProps, type: 'checkbox', id: name, name: name, className: 'sr-only peer' }), _jsx("div", { className: `
                    w-11 h-6 bg-login-500/50 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute ${switchOnly ? 'after:top-0.5' : 'after:top-2.75'} after:left-0.5 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-login
                    ${inputProps.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${error ? 'ring-1 ring-red-500' : ''}
                ` })] }) }));
}
