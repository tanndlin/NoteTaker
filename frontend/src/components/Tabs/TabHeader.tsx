import React, { FC } from 'react';
import Close from '../Close/Close';

import { StoredNote } from '../../common/types';
import '../Close/Close.scss';

type TabHeaderProps = {
    active: boolean;
    onClick: () => void;
    tab: StoredNote;
    closeTab: (tab: StoredNote) => void;
};

const TabHeader: FC<TabHeaderProps> = ({ active, closeTab, onClick, tab }) => {
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
