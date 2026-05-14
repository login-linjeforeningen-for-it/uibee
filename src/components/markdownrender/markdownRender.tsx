import Markdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

const defaultComponents: Components = {
    h1: ({...props}) => <h2 {...props} />,
    pre({ children }) {
        return (
            <pre className='inline-block rounded-lg overflow-auto whitespace-pre-wrap wrap-break-word w-full'>
                {children}
            </pre>
        )
    },
}

export default function MarkdownRender({ MDstr, components, className }: {
    MDstr: string
    components?: Components
    className?: string
}) {
    return (
        <div className={className ?? 'prose prose-sm prose-custom max-w-none'}>
            <Markdown
                components={{ ...defaultComponents, ...components }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {MDstr.replace(/\\n/g, '\n')}
            </Markdown>
        </div>
    )
}
