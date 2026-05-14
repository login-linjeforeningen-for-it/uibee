import Markdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { ExternalLink } from 'lucide-react'

function makeDefaultComponents(): Components {
    return {
        h1: ({...props}) => <h2 {...props} />,
        input({ type, checked }) {
            if (type !== 'checkbox') return <input type={type} />
            return (
                <span
                    data-task-checkbox
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-xs border-2 shrink-0 align-middle
                        ${checked ? 'bg-login border-login' : 'border-login/50'}`}
                >
                    {checked && (
                        <svg viewBox='0 0 10 8' className='w-2.5 h-2.5 fill-none stroke-white stroke-2'>
                            <polyline points='1,4 4,7 9,1' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                    )}
                </span>
            )
        },
        a({ href, children }) {
            return (
                <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1 text-login hover:text-login/80 underline underline-offset-2 transition-colors'
                >
                    {children}
                    <ExternalLink className='w-3 h-3 shrink-0 opacity-70' />
                </a>
            )
        },
        pre({ children }) {
            return (
                <pre className='block rounded-lg overflow-auto whitespace-pre-wrap wrap-break-word w-full'>
                    {children}
                </pre>
            )
        },
    }}

export default function MarkdownRender({ MDstr, components, className }: {
    MDstr: string
    components?: Components
    className?: string
}) {
    return (
        <div className={className ?? 'prose prose-sm prose-custom max-w-none'}>
            <Markdown
                components={{ ...makeDefaultComponents(), ...components }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {MDstr.replace(/\\n/g, '\n')}
            </Markdown>
        </div>
    )
}
