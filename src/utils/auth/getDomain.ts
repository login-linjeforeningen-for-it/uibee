import { NextRequest } from 'next/server'

export function getDomain(req: NextRequest): string {
    const clientProto = req.headers.get('x-forwarded-proto')
    const proto = clientProto ?? new URL(req.url).protocol.replace(':', '')
    const host = req.headers.get('host') ?? req.headers.get('x-forwarded-host') ?? new URL(req.url).host

    return `${proto}://${host}`
}
