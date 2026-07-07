'use client'

import { useState, type ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'

type CodeProps = {
    children: ReactNode
    className?: string
}

export function Code({ children, className = '' }: CodeProps) {
    return (
        <code className={`font-mono text-xs bg-login-700 text-login px-1.5 py-0.5 rounded ${className}`}>
            {children}
        </code>
    )
}

type CodeBlockProps = {
    code: string
    language?: string
    className?: string
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    function copy() {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={`relative group rounded-xl border border-login-500/30 bg-login-900 overflow-hidden ${className}`}>
            <div className='flex items-center justify-between px-4 py-2 border-b border-login-500/20 bg-login-800'>
                <span className='text-xs font-mono text-login-400'>{language ?? ''}</span>
                <button
                    type='button'
                    onClick={copy}
                    className='flex cursor-pointer items-center gap-1.5 text-xs text-login-400 hover:text-login-100 transition-colors'
                >
                    {copied
                        ? <Check className='w-3.5 h-3.5 stroke-emerald-400' />
                        : <Copy className='w-3.5 h-3.5' />
                    }
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className='overflow-x-auto p-4 text-xs font-mono leading-relaxed text-login-100'>
                <code>{code}</code>
            </pre>
        </div>
    )
}
