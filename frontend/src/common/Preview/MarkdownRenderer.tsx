import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import './Markdown.scss';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

type MarkdownRendererProps = {
    markdown: string;
};

const MarkdownRenderer = (props: MarkdownRendererProps) => {
    const HeadingRenderer = (props: any) => {
        const { level, ...rest } = props;

        if (!props.children) return null;

        const idRegex = /\s*{#([\w-]+)}\s*/;
        const idMatch = props.children[0].match(idRegex);
        if (idMatch) {
            rest.id = idMatch[1];
            rest.children = props.children[0].replace(idRegex, '');
        }

        delete rest.node;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return <HeadingTag {...rest} />;
    };

    return (
        <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                header: HeadingRenderer,
                h1: HeadingRenderer,
                h2: HeadingRenderer,
                h3: HeadingRenderer,
                h4: HeadingRenderer,
                h5: HeadingRenderer,
                h6: HeadingRenderer
            }}
        >
            {props.markdown}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
