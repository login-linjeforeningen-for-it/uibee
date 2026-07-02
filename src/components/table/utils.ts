import type { Column } from './types'

export function resolveId<T extends Record<string, unknown>>(
    row: T,
    idKey: string | undefined,
    columns: Column<T>[],
): string {
    if (idKey && row[idKey] !== undefined) return String(row[idKey])
    if (row['id'] !== undefined) return String(row['id'])
    const firstKey = columns[0]?.key ?? Object.keys(row)[0]
    return String(row[firstKey] ?? '')
}
