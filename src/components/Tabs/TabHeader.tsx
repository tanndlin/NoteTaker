import React from 'react';
import { Note } from '../../common/types';

type TabHeaderProps = {
    active: boolean;
    onClick: () => void;
    tab: Note;
};

const TabHeader = (props: TabHeaderProps) => {
    const { active, onClick, tab } = props;

    return (
        <div
            className={`tabHeader ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <h1>{tab.title}</h1>
        </div>
    );
};

export default TabHeader;
