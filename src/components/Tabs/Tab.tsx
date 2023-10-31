import { useContext } from 'react';
import { Preview } from '../../common/Preview/Preview';
import { createLinks } from '../../common/bodyToView';
import { Note } from '../../common/types';
import { NoteContext } from '../../contexts/NoteContext';

type TabProps = {
    tab: Note;
    active: boolean;
    onClick: (id: number) => void;
};

const Tab = (props: TabProps) => {
    const { tab, active, onClick } = props;
    const { notes } = useContext(NoteContext);

    return (
        <section
            className={`tab h-full flex flex-grow ${
                active ? 'active' : 'inactive'
            }`}
            aria-hidden={!active}
            hidden={!active}
        >
            <Preview
                body={createLinks(tab, notes)}
                onClick={onClick}
                notes={notes}
            />
        </section>
    );
};

export default Tab;
