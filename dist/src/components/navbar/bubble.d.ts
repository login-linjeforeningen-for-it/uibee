type BubbleText = {
    href: string;
    className: string;
    fill: string;
    stroke: string;
    text: string;
    x: string;
    hide: boolean;
    handleHide: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};
export default function Bubble({ bubble }: {
    bubble: BubbleText;
}): import("react/jsx-runtime").JSX.Element | null;
export {};
