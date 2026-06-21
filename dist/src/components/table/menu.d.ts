import React from 'react';
export default function Menu({ ref, children, anchor, onClose }: {
    ref: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
    anchor: {
        top: number;
        right: number;
    };
    onClose?: () => void;
}): React.ReactPortal;
export declare function MenuButton({ icon, text, hotKey, onClick, className, }: {
    icon: React.ReactNode;
    text: string;
    hotKey?: string;
    onClick: () => void;
    className?: string;
}): React.JSX.Element;
