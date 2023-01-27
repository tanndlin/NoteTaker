import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import './Preview.scss';

type PreviewProps = {
    body: string;
    onClick?: (id: number) => void;
};

export const Preview = (props: PreviewProps) => {
    const getID = (href: string): number => {
        const paths = href.split('/');
        const [idAsString] = paths.slice(-1);

        return parseInt(idAsString);
    };

    return (
        <div
            className="bg-secondary rounded-md p-4 flex-1 overflow-auto"
            onClick={(e) => {
                if (e.target instanceof HTMLAnchorElement) {
                    if (!props.onClick) return;

                    if (e.target.href.includes('http')) return;

                    e.preventDefault();
                    props.onClick(getID(e.target.href));
                }
            }}
        >
            <MarkdownRenderer markdown={props.body} />
        </div>
    );
};
