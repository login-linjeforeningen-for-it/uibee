import { jsx as _jsx } from "react/jsx-runtime";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function MarkdownRender({ MDstr }) {
    return (_jsx("div", { className: 'prose prose-sm prose-custom max-w-none', children: _jsx(Markdown, { components: { h1: ({ ...props }) => _jsx("h2", { ...props }) }, remarkPlugins: [remarkGfm], children: MDstr.replace(/\\n/g, '\n') }) }));
}
