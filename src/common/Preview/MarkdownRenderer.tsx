import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

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
