const nullableTimeKeys = new Set(['date', 'last_sent', 'sent_at', 'time'])

const RX_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/
const RX_DATE     = /^\d{4}-\d{2}-\d{2}$/
const RX_TIME     = /^\d{2}:\d{2}(:\d{2})?$/

export function formatValue(key: string, value: unknown): string | number {
    if (value === null || value === undefined) {
        return nullableTimeKeys.has(key) ? 'Never' : '-'
    }

    if (typeof value === 'boolean') return value ? 'Yes' : 'No'

    if (typeof value === 'number') {
        if (key.includes('capacity') && value === 0) return 'Unlimited'
        return value
    }

    if (typeof value === 'string') {
        if (RX_DATETIME.test(value)) {
            return new Date(value).toLocaleString('nb-NO', {
                timeZone: 'Europe/Oslo',
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit',
            })
        }
        if (RX_DATE.test(value)) {
            return new Date(value).toLocaleDateString('nb-NO', { timeZone: 'Europe/Oslo' })
        }
        if (RX_TIME.test(value)) {
            return new Date(`1970-01-01T${value}`).toLocaleTimeString('nb-NO', {
                timeZone: 'Europe/Oslo',
                hour: '2-digit', minute: '2-digit',
            })
        }
        return value
    }

    if (Array.isArray(value)) return value.join(', ')

    return String(value)
}
