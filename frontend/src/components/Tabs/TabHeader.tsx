import React from 'react';
import { Note } from '../../common/types';
import Close from '../Close/Close';

import '../Close/Close.scss';

type TabHeaderProps = {
    active: boolean;
    onClick: () => void;
    tab: Note;
    closeTab: (tab: Note) => void;
};

const TabHeader = (props: TabHeaderProps) => {
    const { active, onClick, tab, closeTab } = props;

    const tryOpenTab = (e: React.MouseEvent) => {
        // If e.target has className 'close', don't open the tab
        if (e.target instanceof HTMLElement) {
            if (e.target.classList.contains('close')) {
                return;
            }
        }

        onClick();
    };

    return (
        <div
            className={`tabHeader ${active ? 'active' : ''}`}
            onClick={tryOpenTab}
        >
            <h1>{tab.title}</h1>
            <Close
                callback={() => {
                    closeTab(tab);
                }}
            />
        </div>
    );
};

export default TabHeader;
