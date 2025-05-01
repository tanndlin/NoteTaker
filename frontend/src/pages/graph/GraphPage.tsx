import React, { useContext } from 'react';
import GraphView from './components/GraphView';
import { ID } from './graph.types';

import { useNavigate } from 'react-router-dom';
import FolderViewMinWrapper from '../../common/FolderView/FolderViewMinWrapper';
import { StoredNote } from '../../common/types';
import { smoothTransition } from '../../common/utils';
import { NoteContext } from '../../contexts/NoteContext';
import './GraphPage.scss';

const GraphPage = () => {
    const noteContext = useContext(NoteContext);
    const [filter, setFilter] = React.useState([] as ID[]);
    const navigate = useNavigate();

    const createNote = (qualifiedName: string) => {
        const split = qualifiedName.split('/');
        const title = split[split.length - 1];

        // dir is everything before the last
        const directory = split.slice(0, split.length - 1).join('/');
        const id = noteContext.createNote({
            title,
            directory
        });

        window.location.href = `/${id}`;
    };

    const filterFunction = (note: StoredNote) => {
        if (!filter.length) {
            return true;
        }

        // Check if ID is in filter
        if (filter.some((id) => id === note.id)) {
            return true;
        }

        // Check for dirName in note.directory
        return filter.some((dirName) => note.directory.includes(dirName + ''));
    };

    const onClick = (note: StoredNote) => {
        smoothTransition(() => navigate(`/${note.id}`));
    };

    return (
        <main className="flex flex-grow h-full">
            <aside className="folder-view" id="graphFolderContainer">
                <div className="flex flex-col">
                    <h1 className="text-2xl">Notes</h1>
                    <FolderViewMinWrapper
                        filter={filterFunction}
                        onClick={onClick}
                    />
                </div>
            </aside>

            <section className="flex-1 h-full">
                <GraphView {...{ createNote, setFilter }} />
            </section>
        </main>
    );
};

export default GraphPage;
