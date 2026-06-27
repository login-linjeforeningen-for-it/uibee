import type { ReactNode } from 'react'
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
}

export type FooterProps = {
    logo: ReactNode
    sponsor?: { node: ReactNode; label?: BilingualString }
    columns?: FooterColumn[]
    socialLinks?: FooterSocialLink[]
    copyright: BilingualString
    version?: { label: string; href: string }
    lang?: Lang
    className?: string
}

function t(s: BilingualString, lang: Lang): string {
    return typeof s === 'string' ? s : s[lang]
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
    const hasRight = (columns && columns.length > 0) || (socialLinks && socialLinks.length > 0)

    return (
        <div className={`mt-24 bg-login-950 md:mt-40 ${className || ''}`}>
            <div className={`
                mx-auto w-full px-4 pt-16 pb-24 md:max-w-304 md:px-12 md:pt-20 md:pb-4
                ${hasRight ? 'md:grid md:grid-cols-[18rem_1fr] md:gap-x-12' : ''}
            `}>
                <div className='mx-auto grid w-full max-w-60 gap-16 md:row-span-2 md:max-w-72 md:gap-20'>
                    <div className='block w-full'>{logo}</div>
                    {sponsor && (
                        <div>
                            <div className='block w-full'>{sponsor.node}</div>
                            {sponsor.label && (
                                <p className='pt-8 text-center text-login-100'>{t(sponsor.label, lang)}</p>
                            )}
                        </div>
                    )}
                </div>

                {columns && columns.length > 0 && (
                    <div className={`
                        mt-12 grid w-full max-w-60 gap-8
                        sm:max-w-88 sm:justify-items-end sm:justify-self-end
                        md:col-start-2 md:row-start-1 md:mt-0 md:max-w-136 md:gap-0 md:justify-self-end
                        ${columns.length > 1 ? 'sm:grid-cols-2' : ''}
                    `}>
                        {columns.map((col, i) => (
                            <div key={i} className='sm:justify-self-center md:justify-self-end'>
                                <h4 className='pb-2 text-sm font-medium tracking-widest text-login-100'>
                                    {t(col.heading, lang)}
                                </h4>
                                {col.items.map((item, j) =>
                                    item.href ? (
                                        <a key={j} className='link--underscore-hover block' href={item.href}>
                                            {t(item.label, lang)}
                                        </a>
                                    ) : (
                                        <p key={j}>{t(item.label, lang)}</p>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {socialLinks && socialLinks.length > 0 && (
                    <div className='md:col-start-2 md:row-start-2 md:justify-self-end'>
                        <div className='mx-auto mt-20 mb-12 flex w-fit flex-wrap justify-center gap-6'>
                            {socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    className='block size-8'
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

                <div className='mt-16 flex flex-col items-start gap-4 md:col-span-2 md:row-start-3 md:mt-24 md:grid
                    md:grid-cols-[auto_min-content] md:items-end md:gap-8'
                >
                    <p className='text-xs wrap-break-word text-login-100'>
                        Copyright © {year} {t(copyright, lang)}
                    </p>
                    {version && (
                        <VersionTag version={version.label} url={version.href} />
                    )}
                </div>
            </div>
        </div>
    )
}
