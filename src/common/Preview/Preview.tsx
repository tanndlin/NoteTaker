import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import './Preview.scss';

type PreviewProps = {
    body: string;
};

export const Preview = (props: PreviewProps) => {
    return (
        <div className="bg-secondary rounded-md p-4 flex-1 overflow-auto">
            <MarkdownRenderer markdown={props.body} />
        </div>
    );
};
