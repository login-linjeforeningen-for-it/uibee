import { Components } from 'react-markdown';
export default function MarkdownRender({ MDstr, components, className, size }: {
    MDstr: string;
    components?: Components;
    className?: string;
    size?: 'sm' | 'base' | 'lg' | 'xl';
}): import("react/jsx-runtime").JSX.Element;
