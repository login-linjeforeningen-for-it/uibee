import { jsx as _jsx } from "react/jsx-runtime";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
const defaultComponents = {
    h1: ({ ...props }) => _jsx("h2", { ...props }),
    pre({ children }) {
        return (_jsx("pre", { className: 'inline-block rounded-lg overflow-auto whitespace-pre-wrap wrap-break-word w-full', children: children }));
    },
};
export default function MarkdownRender({ MDstr, components, className }) {
    return (_jsx("div", { className: className ?? 'prose prose-sm prose-custom max-w-none', children: _jsx(Markdown, { components: { ...defaultComponents, ...components }, remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight], children: MDstr.replace(/\\n/g, '\n') }) }));
}
