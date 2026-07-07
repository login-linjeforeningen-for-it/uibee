import type { ReactNode } from 'react'
import Link from 'next/link'
import VersionTag from '@components/version/version'

export type Lang = 'no' | 'en'
export type BilingualString = string | { no: string; en: string }

export type FooterColumn = {
    heading: BilingualString
    items: { label: BilingualString; href?: string }[]
}

export type FooterSocialLink = {
    title: string
    href: string
    icon: ReactNode
    hoverClass?: string
}

export type FooterProps = {
    logo: ReactNode
    sponsor?: { node: ReactNode; label?: BilingualString }
    columns?: FooterColumn[]
    socialLinks?: FooterSocialLink[]
    copyright: BilingualString
    version?: { tag: string; href: string }
    lang?: Lang
    className?: string
}

function t(s: BilingualString, lang: Lang): string {
    return typeof s === 'string' ? s : s[lang]
}

function Column({ col, lang }: { col: FooterColumn; lang: Lang }) {
    return (
        <div>
            <h4 className='pb-2 text-sm font-medium tracking-widest text-login-100'>
                {t(col.heading, lang)}
            </h4>
            {col.items.map((item, j) =>
                item.href ? (
                    item.href.startsWith('/') ? (
                        <Link
                            key={j}
                            className='link--underscore-hover block text-login-50'
                            href={item.href}
                        >
                            {t(item.label, lang)}
                        </Link>
                    ) : (
                        <a
                            key={j}
                            className='link--underscore-hover block text-login-50'
                            href={item.href}
                        >
                            {t(item.label, lang)}
                        </a>
                    )
                ) : (
                    <p key={j} className='text-login-50'>
                        {t(item.label, lang)}
                    </p>
                )
            )}
        </div>
    )
}

export default function Footer({
    logo,
    sponsor,
    columns,
    socialLinks,
    copyright,
    version,
    lang = 'no',
    className,
}: FooterProps) {
    const year = new Date().getFullYear()
    const [firstColumn, ...restColumns] = columns ?? []
    const hasRight = (columns && columns.length > 0) || (socialLinks && socialLinks.length > 0)

    return (
        <div className={`max-md:mt-24 bg-login-950 md:mt-40 ${className || ''}`}>
            <div className={`
                mx-auto w-full pb-4 max-md:px-4 max-md:pt-16 md:max-w-304 md:px-12 md:pt-20
                ${hasRight ? 'md:grid md:grid-cols-[18rem_1fr] md:gap-x-12' : ''}
            `}>
                <div className='mx-auto grid w-full max-md:max-w-60 max-md:gap-16 md:row-span-2 md:max-w-72 md:gap-20'>
                    <div className='block w-full'>{logo}</div>
                    {sponsor && (
                        <div>
                            <div className='block w-full'>{sponsor.node}</div>
                            {sponsor.label && (
                                <p className='pt-8 text-center text-login-100'>
                                    {t(sponsor.label, lang)}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {firstColumn && (
                    <div className='
                        grid w-full self-start max-md:mt-16
                        max-sm:max-w-60 sm:max-md:max-w-88
                        md:col-start-2 md:row-start-1 md:max-w-136 md:justify-self-center
                    '>
                        <Column col={firstColumn} lang={lang} />
                    </div>
                )}

                {restColumns.length > 0 && (
                    <div className={`
                        grid w-full self-start max-md:mt-16 max-md:gap-8
                        max-sm:max-w-60 sm:max-md:max-w-88 sm:justify-items-end sm:justify-self-end
                        md:col-start-2 md:row-start-1 md:max-w-136 md:justify-self-end
                        ${restColumns.length > 1 ? 'sm:grid-cols-2' : ''}
                    `}>
                        {restColumns.map((col, i) => (
                            <div key={i} className='sm:justify-self-center md:justify-self-end'>
                                <Column col={col} lang={lang} />
                            </div>
                        ))}
                    </div>
                )}

                {socialLinks && socialLinks.length > 0 && (
                    <div className='md:col-start-2 md:row-start-2 md:justify-self-end'>
                        <div className='mx-auto mt-20 mb-12 grid w-fit gap-6 max-sm:grid-cols-3 sm:grid-flow-col'>
                            {socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    className={`group mx-auto flex h-8 w-8 items-center justify-center
                                        text-login-100 transition-all duration-200
                                        ${link.hoverClass ?? 'hover:text-login-50'}`}
                                    title={link.title}
                                    href={link.href}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className='mt-24 grid grid-cols-[auto_min-content] items-end gap-8 md:col-span-2 md:row-start-3'>
                    <p className='text-xs wrap-break-word text-login-100'>
                        {lang === 'no' ? 'Opphavsrett' : 'Copyright'} © {year} {t(copyright, lang)}
                    </p>
                    {version && (
                        <VersionTag version={version.tag} url={version.href} />
                    )}
                </div>
            </div>
        </div>
    )
}
