import 'github-markdown-css';
import 'katex/dist/katex.min.css';
import { FC, JSX, useEffect } from 'react';
import ReactMarkdown, { ExtraProps } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import './Markdown.scss';

type MarkdownRendererProps = {
    markdown: string;
};

type HeadingRendererProps = JSX.IntrinsicElements['h1'] &
    ExtraProps & { level?: number };

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ markdown }) => {
    const HeadingRenderer = (props: HeadingRendererProps) => {
        const { level, ...rest } = props;

        if (!props.children) {
            return null;
        }

        const idRegex = /\s*{#([\w-]+)}\s*/;
        const children = props.children as unknown as string[];
        const idMatch = children[0].match(idRegex);
        if (idMatch) {
            rest.id = idMatch[1];
            rest.children = children[0].replace(idRegex, '');
        }

        delete rest.node;
        const HeadingTag = `h${level}` as
            'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        return <HeadingTag {...rest} />;
    };

    useEffect(() => {
        document.querySelectorAll('.markdown-body>*').forEach((element, i) => {
            element.setAttribute(
                'style',
                `view-transition-name: preview-item-${i}`
            );
        });
    }, [markdown]);

    return (
        <div className="markdown-body">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    h1: HeadingRenderer,
                    h2: HeadingRenderer,
                    h3: HeadingRenderer,
                    h4: HeadingRenderer,
                    h5: HeadingRenderer,
                    h6: HeadingRenderer
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
