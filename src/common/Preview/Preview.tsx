import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import './Preview.scss';
import { Note } from '../types';
import { createLinks } from '../bodyToView';

type PreviewProps = {
    body: string;
    onClick?: (id: number) => void;
    notes: Note[];
};

export const Preview = (props: PreviewProps) => {
    const getID = (href: string): number => {
        const paths = href.split('/');
        const [idAsString] = paths.slice(-1);

        return parseInt(idAsString);
    };

    const getTextFromID = (id: number) => {
        const note = props.notes.find((note) => note.id === id);
        if (!note) return <></>;

        return (
            <div className="tooltip-content">
                <MarkdownRenderer markdown={createLinks(note, props.notes)} />
            </div>
        );
    };

    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [tooltipContent, settooltipContent] = React.useState(<></>);
    const [tooltipPosition, settooltipPosition] = React.useState([0, 0]);

    const showTooltip = (el: HTMLAnchorElement) => {
        const isCurrentDomain = el.href.includes(window.location.origin);
        if (!isCurrentDomain) return;

        const id = getID(el.href);
        const tooltipContent = getTextFromID(id);
        settooltipContent(tooltipContent);

        const rect = el.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        settooltipPosition([x, y]);

        setTooltipVisible(true);
    };

    return (
        <div
            className="bg-secondary rounded-md p-4 flex-1 overflow-auto"
            onClick={(e) => {
                console.log(e.target);

                if (e.target instanceof HTMLAnchorElement) {
                    if (!props.onClick) return;

                    const isCurrentDomain = e.target.href.includes(
                        window.location.origin
                    );
                    if (!isCurrentDomain) return;

                    e.preventDefault();
                    props.onClick(getID(e.target.href));
                }
            }}
            onMouseMove={(e) => {
                const tooltip = document.querySelector('.tooltip');
                // console.log(tooltip);
                if (e.target instanceof HTMLAnchorElement) {
                    if (tooltipVisible) return;

                    const el = e.target;
                    showTooltip(el);
                } else if (
                    !(
                        e.currentTarget === tooltip ||
                        tooltip?.contains(e.target as Node)
                    )
                ) {
                    setTooltipVisible(false);
                }
            }}
        >
            <div
                className="tooltip"
                style={{
                    display: tooltipVisible ? 'block' : 'none',
                    left: tooltipPosition[0],
                    top: tooltipPosition[1] + 20
                }}
            >
                {tooltipContent}
            </div>
            <MarkdownRenderer markdown={props.body} />
        </div>
    );
};
