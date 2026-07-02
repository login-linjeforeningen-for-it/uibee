import type { TableColor, Density, TableVariant } from './types'

export const HIGHLIGHT: Record<TableColor, string> = {
    green:  'bg-green-500/15  text-green-400  ring-1 ring-green-500/25',
    yellow: 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/25',
    red:    'bg-red-500/15    text-red-400    ring-1 ring-red-500/25',
    blue:   'bg-blue-500/15   text-blue-400   ring-1 ring-blue-500/25',
    gray:   'bg-gray-500/15   text-gray-400   ring-1 ring-gray-500/25',
    orange: 'bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/25',
    purple: 'bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/25',
}

export const DENSITY_TH: Record<Density, string> = {
    compact:     'px-4 py-2',
    comfortable: 'px-6 py-3',
    spacious:    'px-8 py-4',
}

export const DENSITY_TD: Record<Density, string> = {
    compact:     'px-4 py-1.5',
    comfortable: 'px-6 py-3.5',
    spacious:    'px-8 py-5',
}

export const VARIANT_CONTAINER: Record<TableVariant, string> = {
    original: 'bg-login-500/50 rounded-lg border border-login-600 shadow',
    modern:   'bg-transparent',
}

export const VARIANT_THEAD: Record<TableVariant, string> = {
    original: 'bg-login-700',
    modern:   'bg-transparent',
}

export const VARIANT_HEAD_BG: Record<TableVariant, string> = {
    original: 'bg-login-700',
    modern:   '',
}

export const VARIANT_HEAD_BORDER: Record<TableVariant, string> = {
    original: 'border-b border-login-600',
    modern:   'border-b border-login-500/40',
}

export const VARIANT_ROW_BORDER: Record<TableVariant, string> = {
    original: 'border-b border-login-600',
    modern:   'border-b border-login-600/15',
}

export const VARIANT_THEAD_TH: Record<TableVariant, string> = {
    original: 'text-login-200',
    modern:   'text-login-300',
}

export const VARIANT_TBODY: Record<TableVariant, string> = {
    original: 'bg-login-500/50 divide-login-600',
    modern:   'divide-login-600/15',
}

export const VARIANT_ROW_HOVER: Record<TableVariant, string> = {
    original: 'hover:bg-login-600/30',
    modern:   'hover:bg-login-700/50',
}

export const VARIANT_ROW_STRIPED: Record<TableVariant, string> = {
    original: 'even:bg-login-600/40',
    modern:   'even:bg-login-800/40',
}
