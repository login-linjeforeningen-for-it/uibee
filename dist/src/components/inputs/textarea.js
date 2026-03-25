import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, Pencil } from 'lucide-react';
import { FieldWrapper } from './shared';
import MarkdownRender from '../markdownrender/markdownRender';
function isValidJson(str) {
    try {
        JSON.parse(str);
        return null;
    }
    catch (error) {
        return error.message;
    }
}
export default function Textarea(props) {
    const { name, label, error, className, info, description, type = 'text', rows = 4, textSize = 'sm', ...textareaProps } = props;
    const { value } = textareaProps;
    const [preview, setPreview] = useState(false);
    const jsonError = type === 'json' && value ? isValidJson(value) : undefined;
    const displayError = jsonError || error;
    console.log(value);
    return (_jsx(FieldWrapper, { label: label, name: name, required: textareaProps.required, info: info, description: description, error: displayError, textSize: textSize, className: className, children: _jsxs("div", { className: 'relative', children: [type === 'markdown' && (_jsx("div", { className: 'absolute right-2 top-2 z-10 flex gap-2', children: _jsx("button", { type: 'button', onClick: () => setPreview(!preview), className: 'p-1 rounded hover:bg-login-500/50 text-login-text transition-colors', title: preview ? 'Edit' : 'Preview', children: preview ? _jsx(Pencil, { size: 16 }) : _jsx(Eye, { size: 16 }) }) })), type === 'markdown' && preview && (_jsx("div", { className: `
                            w-full rounded-md bg-login-500/50 border border-login-500 
                            p-3 overflow-y-auto ${error ? 'border-red-500' : ''}
                        `, children: _jsx(MarkdownRender, { MDstr: String(value || '') }) })), _jsx("textarea", { ...textareaProps, id: name, name: name, rows: rows, title: label, "aria-invalid": !!error, "aria-describedby": error ? `${name}-error` : undefined, className: `
                        ${type === 'markdown' && preview ? 'hidden' : ''}
                        w-full rounded-md bg-login-500/50 border border-login-500 
                        text-login-text placeholder-login-200
                        focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                        disabled:opacity-50 disabled:cursor-not-allowed
                        p-3 pr-10
                        transition-all duration-200
                        resize-y
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    ` })] }) }));
}
