import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ExternalLink } from 'lucide-react';
function makeDefaultComponents() {
    return {
        h1: ({ ...props }) => _jsx("h2", { ...props }),
        input({ type, checked }) {
            if (type !== 'checkbox')
                return _jsx("input", { type: type });
            return (_jsx("span", { "data-task-checkbox": true, className: `inline-flex items-center justify-center w-4 h-4 rounded-xs border-2 shrink-0 align-middle
                        ${checked ? 'bg-login border-login' : 'border-login/50'}`, children: checked && (_jsx("svg", { viewBox: '0 0 10 8', className: 'w-2.5 h-2.5 fill-none stroke-white stroke-2', children: _jsx("polyline", { points: '1,4 4,7 9,1', strokeLinecap: 'round', strokeLinejoin: 'round' }) })) }));
        },
        a({ href, children }) {
            return (_jsxs("a", { href: href, target: '_blank', rel: 'noopener noreferrer', className: 'inline-flex items-center gap-1 text-login hover:text-login/80 underline underline-offset-2 transition-colors', children: [children, _jsx(ExternalLink, { className: 'w-3 h-3 shrink-0 opacity-70' })] }));
        },
        pre({ children }) {
            return (_jsx("pre", { className: 'block rounded-lg overflow-auto whitespace-pre-wrap wrap-break-word w-full', children: children }));
        },
    };
}
export default function MarkdownRender({ MDstr, components, className }) {
    return (_jsx("div", { className: className ?? 'prose prose-sm prose-custom max-w-none', children: _jsx(Markdown, { components: { ...makeDefaultComponents(), ...components }, remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight], children: MDstr.replace(/\\n/g, '\n') }) }));
}
