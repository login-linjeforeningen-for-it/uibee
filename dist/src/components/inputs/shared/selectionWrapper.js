import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InputLabel from './inputLabel';
import InputInfo from './inputInfo';
import InputError from './inputError';
export default function SelectionWrapper({ label, name, required, info, error, description, children, className, disabled, hideError, }) {
    return (_jsxs("div", { className: `flex flex-col gap-1 ${className || ''}`, children: [_jsxs("div", { className: 'flex items-start justify-between mb-1', children: [_jsxs("div", { className: 'flex items-center gap-2', children: [children, label && (_jsx(InputLabel, { label: label, name: name, required: required, disabled: disabled, className: 'select-none cursor-pointer' }))] }), info && _jsx(InputInfo, { info: info })] }), description && (_jsx("p", { className: 'text-xs text-login-200 ml-7 -mt-1 mb-1', children: description })), !hideError && _jsx(InputError, { error: error })] }));
}
