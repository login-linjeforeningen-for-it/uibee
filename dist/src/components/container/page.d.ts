type PageContainerProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
};
export default function PageContainer({ title, children, className, innerClassName }: PageContainerProps): import("react").JSX.Element;
export {};
