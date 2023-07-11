import React from 'react';
import { createLinks } from '../bodyToView';
import { Note } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import './Preview.scss';

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
        if (!note) {
            return <></>;
        }

        return (
            <div className="tooltip-content">
                <MarkdownRenderer markdown={createLinks(note, props.notes)} />
            </div>
        );
    };

    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [tooltipContent, settooltipContent] = React.useState(<></>);
    const [tooltipPosition, settooltipPosition] = React.useState([0, 0]);

    const [currentID, setCurrentID] = React.useState<number | null>(null);

    const removeTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const showTooltip = (el: HTMLAnchorElement) => {
        const isCurrentDomain = el.href.includes(window.location.origin);
        if (!isCurrentDomain) {
            return;
        }

        if (removeTimeout.current) {
            clearTimeout(removeTimeout.current);
            removeTimeout.current = null;
        }

        const id = getID(el.href);
        setCurrentID(id);

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
                if (e.target instanceof HTMLAnchorElement) {
                    if (!props.onClick) {
                        return;
                    }

                    const isCurrentDomain = e.target.href.includes(
                        window.location.origin
                    );
                    if (!isCurrentDomain) {
                        return;
                    }

                    e.preventDefault();
                    props.onClick(getID(e.target.href));
                }
            }}
            onMouseMove={(e) => {
                const tooltip = document.querySelector('.tooltip');

                if (e.target instanceof HTMLAnchorElement) {
                    const id = getID(e.target.href);
                    if (tooltipVisible) {
                        return;
                    }
                    if (
                        currentID !== id &&
                        tooltip?.contains(e.target as Node)
                    ) {
                        // this does not work
                        return;
                    }

                    const el = e.target;
                    showTooltip(el);
                } else if (
                    !(
                        e.currentTarget === tooltip ||
                        tooltip?.contains(e.target as Node)
                    )
                ) {
                    if (removeTimeout.current) {
                        return;
                    }

                    removeTimeout.current = setTimeout(() => {
                        setTooltipVisible(false);
                        setCurrentID(null);
                        removeTimeout.current = null;
                    }, 500);
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
