import React from 'react';
import { Configs, Note } from '../../common/types';
import GraphView from './components/GraphView';
import { ID } from './graph.types';

import FolderViewMinWrapper from '../../common/FolderView/FolderViewMinWrapper';
import './GraphPage.scss';

type GraphPageProps = {
    notes: Note[];
    createNote: (qualifiedName: string) => void;
    configs: Configs;
};

const GraphPage = (props: GraphPageProps) => {
    const { notes, configs } = props;
    const [filter, setFilter] = React.useState([] as ID[]);

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
        <main className="flex flex-grow h-full">
            <aside id="graphFolderContainer">
                <div className="flex flex-col">
                    <h1 className="text-2xl">Files</h1>
                    <FolderViewMinWrapper
                        notes={notes}
                        filter={filterFunction}
                    />
                </div>
            </aside>

            <section className="flex-1 h-full">
                <GraphView {...{ ...props, setFilter }} />
            </section>
        </main>
    );
};

export default GraphPage;
