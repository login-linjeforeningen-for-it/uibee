type BubbleText = {
    href: string
    className: string
    fill: string
    stroke: string
    text: string
}

export default function Bubble({ href, className, fill, stroke, text }: BubbleText) {
    return (
        <a
            href={href}
            className={className}
        >
            <svg
                viewBox='0 0 24 12'
                className='absolute -top-[0.68rem] right-6 h-3 w-6'
                aria-hidden='true'
            >
                <path
                    d='M12 0 24 12H0Z'
                    fill={fill}
                    stroke={stroke}
                    strokeWidth='1.5'
                    strokeLinejoin='round'
                />
                <path
                    d='M12 0 24 12H0Z'
                    fill={fill}
                />
            </svg>
            <span>{text}</span>
        </a>
    )
}
