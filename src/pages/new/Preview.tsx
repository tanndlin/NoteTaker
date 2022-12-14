import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

type PreviewProps = {
    markdown: string;
};

export const Preview = (props: PreviewProps) => {
    return (
        <>
            <div
                id="previewContainer"
                className="flex-1 bg-secondary rounded-md p-2"
            >
                <ReactMarkdown className="markdown-body">
                    {props.markdown}
                </ReactMarkdown>
            </div>
        </>
    );
};
