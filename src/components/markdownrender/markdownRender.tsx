import Markdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const defaultComponents: Components = {
    h1: ({...props}) => <h2 {...props} />,
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
            >
                {MDstr.replace(/\\n/g, '\n')}
            </Markdown>
        </div>
    )
}
