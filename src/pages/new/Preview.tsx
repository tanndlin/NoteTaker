import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

type PreviewProps = {
    markdown: string;
    tags: string[];
};

export const Preview = (props: PreviewProps) => {
    return (
        <>
            <h2 className="text-2xl text-center w-full mb-8">Preview</h2>
            <header id="fakeTags" className="flex mb-2">
                <ul className="flex ml-auto bg-secondary gap-4 max-w-1/3 justify-center rounded-md p-2">
                    {props.tags.map((tag) => (
                        <li className="bg-tertiary p-1 rounded-md">{tag}</li>
                    ))}
                </ul>
            </header>

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
