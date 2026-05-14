import { Components } from 'react-markdown';
export default function MarkdownRender({ MDstr, components, className }: {
    MDstr: string;
    components?: Components;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
