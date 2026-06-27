import Link from 'next/link'

type VersionTagProps = {
    version?: string
    url?: string
    className?: string
}

export default function VersionTag({version, url, className}: VersionTagProps) {
    if (!version) {
        return
    }

    const style =
        `w-fit bg-login-700 text-login-100 border border-login-500/40 text-xs font-mono px-2 py-0.5 rounded ${className || ''}`

    if (url) {
        return (
            <Link
                className={style}
                target='_blank'
                href={url}
            >
                v{version}
            </Link>
        )
    }

    return (
        <div className={style}>
            v{version}
        </div>
    )
}
