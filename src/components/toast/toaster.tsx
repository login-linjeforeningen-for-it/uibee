'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Toast, ToastType } from 'uibee/components'
import ToastItem from './toastItem'

const listeners = new Set<(toast: Toast) => void>()
let idCounter = 0

export function toast(message: string, type: ToastType, duration = 4000) {
    const id = ++idCounter
    listeners.forEach(listener => listener({ id, message, type, expiresAt: Date.now() + duration }))
}

toast.info = (message: string, duration?: number) => toast(message, 'info', duration)
toast.success = (message: string, duration?: number) => toast(message, 'success', duration)
toast.warning = (message: string, duration?: number) => toast(message, 'warning', duration)
toast.error = (message: string, duration?: number) => toast(message, 'error', duration)

export default function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([])
    const [expanded, setExpanded] = useState(false)
    const [heights, setHeights] = useState<Record<number, number>>({})

    useEffect(() => {
        function addToast(toast: Toast) {
            setToasts(prev => [toast, ...prev])
        }

        listeners.add(addToast)

        return () => {
            listeners.delete(addToast)
        }
    }, [])

    useEffect(() => {
        const now = Date.now()
        setToasts(prev => prev.map(toast => {
            if (expanded) return { ...toast, pausedAt: toast.pausedAt || now }
            if (!toast.pausedAt) return toast
            return { ...toast, expiresAt: toast.expiresAt + (now - toast.pausedAt), pausedAt: undefined }
        }))
    }, [expanded])

    function removeToast(id: number) {
        setToasts(prev => prev.map(toast => toast.id === id ? { ...toast, exiting: true } : toast))
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id))
        }, 300)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (expanded) return
            const now = Date.now()
            setToasts(prev => {
                const toastsToExit = prev.filter(toast => !toast.exiting && !toast.pausedAt && toast.expiresAt <= now)
                if (toastsToExit.length === 0) return prev

                toastsToExit.forEach(toast => {
                    setTimeout(() => {
                        setToasts(current => current.filter(item => item.id !== toast.id))
                    }, 300)
                })

                return prev.map(toast => toastsToExit.find(exitToast => exitToast.id === toast.id) ? { ...toast, exiting: true } : toast)
            })
        }, 100)
        return () => clearInterval(timer)
    }, [expanded])

    function onHeight(id: number, height: number) {
        setHeights(prev => {
            if (prev[id] === height) return prev
            return { ...prev, [id]: height }
        })
    }

    const visibleToasts = toasts.slice(0, expanded ? 10 : 3)
    const frontHeight = heights[visibleToasts[0]?.id] || 60

    const offsets = useMemo(() => {
        let currentOffset = 0
        return visibleToasts.map(toast => {
            const height = heights[toast.id] || 60
            const offset = currentOffset
            currentOffset += height + 16
            return offset
        })
    }, [visibleToasts, heights])

    const totalHeight = offsets.length > 0
        ? offsets[offsets.length - 1] + (heights[visibleToasts[visibleToasts.length - 1]?.id] || 60)
        : 0

    return (
        <ul
            aria-live='polite'
            className={`fixed bottom-4 right-4 z-9999 w-full max-w-sm flex flex-col items-end transition-all duration-300 ease-out
                ${expanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ height: expanded ? totalHeight + 'px' : 'auto' }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {visibleToasts.map((toast, index) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    index={index}
                    expanded={expanded}
                    onRemove={() => removeToast(toast.id)}
                    onHeight={onHeight}
                    offset={offsets[index]}
                    frontHeight={frontHeight}
                />
            ))}
        </ul>
    )
}
