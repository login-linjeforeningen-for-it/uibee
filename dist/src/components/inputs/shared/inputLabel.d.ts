interface InputLabelProps {
    label: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}
export default function InputLabel({ label, name, required, disabled, className }: InputLabelProps): import("react").JSX.Element;
export {};
