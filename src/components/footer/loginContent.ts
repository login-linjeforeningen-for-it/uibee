import type { FooterColumn } from './footer'

export const loginAddress: FooterColumn = {
    heading: { no: 'Adresse', en: 'Address' },
    items: [
        { label: 'Teknologivegen 22' },
        { label: { no: 'Bygg A, rom 155', en: 'Building A, room 155' } },
        { label: '2815 GJØVIK' },
    ],
}

export const loginEmail = (email: string): FooterColumn => ({
    heading: { no: 'E-post', en: 'Email' },
    items: [{ label: email, href: `mailto:${email}` }],
})

export const loginCopyright = {
    no: 'Login - Linjeforeningen for IT, NO 811 940 372',
    en: 'Login - Association for IT, NO 811 940 372',
} as const

export const loginSponsor = {
    label: { no: 'Hovedsamarbeidspartner', en: 'Main partner' },
} as const

export type LoginSocialLinkData = {
    title: string
    href: string
    iconClass: string
}

export const loginSocialLinks: LoginSocialLinkData[] = [
    { title: 'Discord',   href: 'https://discord.gg/login-ntnu',                                          iconClass: 'logfont-discord'   },
    { title: 'Instagram', href: 'https://www.instagram.com/login_linjeforening/',                          iconClass: 'logfont-instagram' },
    { title: 'Facebook',  href: 'https://facebook.com/LogNTNU',                                            iconClass: 'logfont-facebook'  },
    { title: 'LinkedIn',  href: 'https://www.linkedin.com/company/linjeforeningen-login/about',            iconClass: 'logfont-linkedin'  },
    { title: 'GitHub',    href: 'https://github.com/login-linjeforeningen-for-it',                        iconClass: 'logfont-github'    },
    { title: 'Wiki',      href: 'https://outline.login.no/s/doc',                                         iconClass: 'logfont-wikijs'    },
]
