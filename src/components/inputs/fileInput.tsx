'use client'

import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { UploadCloud, X, FileIcon } from 'lucide-react'

type FileInputProps = {
    name: string
    label?: string
    accept?: string
    multiple?: boolean
    onChange: (files: File[]) => void
    className?: string
}

export default function FileInput({ name, label, accept, multiple = false, onChange, className = '' }: FileInputProps) {
    const [files, setFiles] = useState<File[]>([])
    const [dragging, setDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    function handleFiles(incoming: FileList | null) {
        if (!incoming) return
        const arr = multiple ? Array.from(incoming) : [incoming[0]]
        setFiles(arr)
        onChange(arr)
    }

    function removeFile(index: number) {
        const next = files.filter((_, i) => i !== index)
        setFiles(next)
        onChange(next)
        if (inputRef.current) inputRef.current.value = ''
    }

    function onDrop(e: DragEvent) {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className='text-sm font-medium text-login-200'>{label}</label>}
            <div
                role='button'
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`
                    flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6
                    transition-all duration-150
                    ${dragging
            ? 'scale-[1.01] border-login bg-login/5'
            : 'border-login-500/50 bg-login-800/30 hover:border-login/50 hover:bg-login/5'
        }
                `}
            >
                <input
                    ref={inputRef}
                    type='file'
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    className='hidden'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
                />
                <UploadCloud className='h-7 w-7 text-login-400' />
                <div className='text-center'>
                    <p className='text-sm text-login-200'>
                        Drop files here or <span className='text-login'>browse</span>
                    </p>
                    {accept && <p className='mt-0.5 text-xs text-login-400'>{accept}</p>}
                </div>
            </div>
            {files.length > 0 && (
                <ul className='flex flex-col gap-1.5'>
                    {files.map((file, i) => (
                        <li key={i} className='
                            flex items-center gap-2 rounded-lg
                            border border-login-500/25 bg-login-800/50 px-3 py-2 text-sm
                        '>
                            <FileIcon className='h-4 w-4 shrink-0 text-login-400' />
                            <span className='flex-1 truncate text-login-200'>{file.name}</span>
                            <span className='shrink-0 text-xs text-login-400'>{(file.size / 1024).toFixed(1)} KB</span>
                            <button
                                type='button'
                                onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                                className='cursor-pointer text-login-400 transition-colors hover:text-red-400'
                            >
                                <X className='h-3.5 w-3.5' />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
