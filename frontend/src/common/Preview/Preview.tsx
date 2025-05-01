import React, { useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import { StoredNote } from '../types';
import { preProcessNote } from '../utils';
import MarkdownRenderer from './MarkdownRenderer';
import './Preview.scss';

type PreviewProps = {
    note: StoredNote;
    onClick?: (id: number) => void;
    notes: StoredNote[];
};

export const Preview = (props: PreviewProps) => {
    const { configs } = useContext(ConfigContext);
    const { note, notes, onClick } = props;
    const body = preProcessNote(note, notes, configs);

    const getID = (href: string): number => {
        const paths = href.replace('/edit', '').split('/');
        const [idAsString] = paths.slice(-1);

        return parseInt(idAsString);
    };

    const getTextFromID = (id: number) => {
        const note = notes.find((note) => note.id === id);
        if (!note) {
            console.error('Note not found', id);
            return <></>;
        }

        return (
            <div className="tooltip-content">
                <MarkdownRenderer
                    markdown={preProcessNote(note, notes, configs)}
                />
            </div>
        );
    };

    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [tooltipContent, settooltipContent] = React.useState(<></>);
    const [tooltipPosition, settooltipPosition] = React.useState([0, 0]);

    const [currentID, setCurrentID] = React.useState<number | null>(null);

    const removeTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const showTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const showTooltip = (el: HTMLAnchorElement) => {
        const isCurrentDomain = el.href.includes(window.location.origin);
        if (!isCurrentDomain) {
            return;
        }

        if (removeTimeout.current) {
            clearTimeout(removeTimeout.current);
            removeTimeout.current = null;
        }

        if (showTimeout.current) {
            clearTimeout(showTimeout.current);
        }

        showTimeout.current = setTimeout(() => {
            const id = getID(el.href);
            setCurrentID(id);

            const tooltipContent = getTextFromID(id);
            settooltipContent(tooltipContent);

            const rect = el.getBoundingClientRect();
            const x = rect.left + window.scrollX;
            const y = rect.top + window.scrollY;
            settooltipPosition([x, y]);

            setTooltipVisible(true);
        }, configs.appearance.previewDelay);
    };

    return (
        <div
            className="flex-1 p-4 overflow-auto rounded-md bg-secondary"
            id="previewContainer"
            onClick={(e) => {
                if (e.target instanceof HTMLAnchorElement) {
                    if (!onClick) {
                        return;
                    }

                    const isCurrentDomain = e.target.href.includes(
                        window.location.origin
                    );
                    if (!isCurrentDomain) {
                        return;
                    }

                    e.preventDefault();
                    onClick(getID(e.target.href));
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
            <MarkdownRenderer markdown={body} />
        </div>
    );
};
