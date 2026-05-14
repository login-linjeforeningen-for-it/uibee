import { jsx as _jsx } from "react/jsx-runtime";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const defaultComponents = {
    h1: ({ ...props }) => _jsx("h2", { ...props }),
};
export default function MarkdownRender({ MDstr, components, className }) {
    return (_jsx("div", { className: className ?? 'prose prose-sm prose-custom max-w-none', children: _jsx(Markdown, { components: { ...defaultComponents, ...components }, remarkPlugins: [remarkGfm], children: MDstr.replace(/\\n/g, '\n') }) }));
}
