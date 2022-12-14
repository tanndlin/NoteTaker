import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import './Preview.scss';
type PreviewProps = {
    body: string;
};

export const Preview = (props: PreviewProps) => {
    return (
        <div className="bg-secondary rounded-md p-4 flex-1 overflow-auto">
            <ReactMarkdown className="markdown-body">
                {props.body}
            </ReactMarkdown>
        </div>
    );
};
