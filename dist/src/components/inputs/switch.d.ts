export type SwitchProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string;
    label?: string;
    error?: string;
    info?: string;
    description?: string;
    className?: string;
    switchOnly?: boolean;
    textSize?: 'sm' | 'md';
};
export default function Switch(props: SwitchProps): import("react").JSX.Element;
