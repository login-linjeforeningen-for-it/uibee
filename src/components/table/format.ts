const nullableTimeKeys = ['date', 'last_sent', 'time']

const ISODateTimeReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/
const ISODateReg = /^\d{4}-\d{2}-\d{2}$/
const ISOTimeReg = /^\d{2}:\d{2}(:\d{2})?$/

const OsloTZ = { timeZone: 'Europe/Oslo' } as const
const OsloTime: Intl.DateTimeFormatOptions = { ...OsloTZ, hour: '2-digit', minute: '2-digit' }
const OsloDateTime: Intl.DateTimeFormatOptions = { ...OsloTime, year: 'numeric', month: '2-digit', day: '2-digit' }

export function formatValue(key: string, value: string | number) {
    if (nullableTimeKeys.includes(key) && !value) {
        return 'Never'
    }

    if (typeof value === 'string') {
        if (ISODateTimeReg.test(value)) {
            return new Date(value).toLocaleString('nb-NO', OsloDateTime)
        }

        if (ISODateReg.test(value)) {
            return new Date(value).toLocaleDateString('nb-NO', OsloTZ)
        }

        if (ISOTimeReg.test(value)) {
            return new Date(`1970-01-01T${value}`).toLocaleTimeString('nb-NO', OsloTime)
        }
    }

    if (key.includes('capacity')) {
        return value === 0 ? 'Unlimited' : value
    }

    return value
}
