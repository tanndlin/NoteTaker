import React from 'react';
import { Note } from '../../common/types';
import GraphView from './components/GraphView';
import { ID } from './graph.types';

import FolderViewMinWrapper from '../../common/FolderView/FolderViewMinWrapper';
import './GraphPage.scss';

type GraphPageProps = {
    notes: Note[];
    createNote: (qualifiedName: string) => void;
};

const GraphPage = (props: GraphPageProps) => {
    const { notes, createNote } = props;
    const [openStates, setOpenStates] = React.useState<{
        [key: string]: boolean;
    }>(JSON.parse(localStorage.getItem('openStates') || '{}'));
    const [filter, setFilter] = React.useState([] as ID[]);

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    const filterFunction = (note: Note) => {
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

    return (
        <main className="flex h-full flex-grow">
            <aside id="graphFolderContainer">
                <div className="flex flex-col">
                    <h1 className="text-2xl">Files</h1>
                    <FolderViewMinWrapper
                        notes={notes}
                        filter={filterFunction}
                    />
                </div>
            </aside>

            <section className="h-full flex-1">
                <GraphView {...{ ...props, setFilter }} />
            </section>
        </main>
    );
};

export default GraphPage;
