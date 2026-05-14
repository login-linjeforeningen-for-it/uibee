import { Components } from 'react-markdown';
import 'highlight.js/styles/github-dark.css';
export default function MarkdownRender({ MDstr, components, className }: {
    MDstr: string;
    components?: Components;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
