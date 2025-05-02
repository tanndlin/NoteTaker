import { FC, useContext } from 'react';
import Preview from '../../common/Preview/Preview';
import { StoredNote } from '../../common/types';
import { NoteContext } from '../../contexts/NoteContext';

type TabProps = {
    tab: StoredNote;
    active: boolean;
    onClick: (id: number) => void;
};

const Tab: FC<TabProps> = ({ active, onClick, tab }) => {
    const { notes } = useContext(NoteContext);

    return (
        <section
            className={`tab h-full flex flex-grow ${
                active ? 'active' : 'inactive'
            }`}
            aria-hidden={!active}
            hidden={!active}
        >
            <Preview note={tab} onClick={onClick} notes={notes} />
        </section>
    );
};

export default Tab;
