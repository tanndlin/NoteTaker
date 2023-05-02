import React from 'react';
import { Preview } from '../../common/Preview/Preview';
import { createLinks } from '../../common/bodyToView';
import { Note } from '../../common/types';

type TabProps = {
    tab: Note;
    active: boolean;
    notes: Note[];
    onClick: (id: number) => void;
};

const Tab = (props: TabProps) => {
    const { tab, active, onClick, notes } = props;

    return (
        <section
            className={`tab h-full flex flex-grow ${
                active ? 'active' : 'inactive'
            }`}
            aria-hidden={!active}
            hidden={!active}
        >
            <Preview
                body={createLinks(tab, props.notes)}
                onClick={onClick}
                notes={notes}
            />
        </section>
    );
};

export default Tab;
