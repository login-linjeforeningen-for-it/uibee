import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRender({MDstr}: {MDstr: string}) {
    return (
        <div className='prose prose-sm prose-custom max-w-none'>
            <Markdown
                components={{ h1: ({...props}) => <h2 {...props} /> }}
                remarkPlugins={
                    [remarkGfm]
                }
            >
                {MDstr.replace(/\\n/g, '\n')}
            </Markdown>
        </div>
    )
}
