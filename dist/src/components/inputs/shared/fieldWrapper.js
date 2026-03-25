import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InputLabel from './inputLabel';
import InputInfo from './inputInfo';
import InputError from './inputError';
import MarkdownRender from '../../markdownrender/markdownRender';
export default function FieldWrapper({ label, name, required, info, error, description, textSize = 'sm', children, className, }) {
    return (_jsxs("div", { className: `flex flex-col gap-1 w-full relative ${className || ''}`, children: [(label || info) && (_jsxs("div", { className: 'flex items-center justify-between mb-1', children: [label && (_jsx(InputLabel, { label: label, name: name, required: required, className: `ml-1 ${textSize === 'sm' ? 'text-sm!' : 'text-base!'}` })), info && _jsx(InputInfo, { info: info })] })), description && (_jsx("div", { className: 'text-login-100 **:text-xs! ml-1 mb-1', children: _jsx(MarkdownRender, { MDstr: String(description || '') }) })), children, _jsx(InputError, { error: error, id: `${name}-error` })] }));
}
