import React from 'react';
import { FolderView } from '../../common/FolderView/FolderView';
import FolderMinusIcon from '../../common/Icons/FolderMinusIcon';
import FolderOpenIcon from '../../common/Icons/FolderOpenIcon';
import HomeIcon from '../../common/Icons/HomeIcon';
import { Note } from '../../common/types';
import GraphView from './components/GraphView';
import { ID } from './graph.types';

type GraphPageProps = {
    notes: Note[];
};

const GraphPage = (props: GraphPageProps) => {
    const { notes } = props;
    const [openStates, setOpenStates] = React.useState<{
        [key: string]: boolean;
    }>(JSON.parse(localStorage.getItem('openStates') || '{}'));
    const [filter, setFilter] = React.useState([] as ID[]);

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    const expandAll = () => {
        const newOpenStates = { ...openStates };
        Object.keys(openStates).forEach((key) => {
            newOpenStates[key] = true;
        });
        setOpenStates(newOpenStates);
    };

    const foldAll = () => {
        const newOpenStates = { ...openStates };
        Object.keys(openStates).forEach((key) => {
            newOpenStates[key] = false;
        });
        setOpenStates(newOpenStates);
    };

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
            <aside className="bg-secondary h-full p-4 ml-4 flex">
                <div className="flex flex-col justify-between">
                    <section className="overflow-auto overflow-x-hidden">
                        <h1>Files</h1>
                        <div className="w-max mr-4 mb-4">
                            <FolderView
                                {...{
                                    notes,
                                    filter: filterFunction,
                                    openStates,
                                    setOpenStates
                                }}
                            />
                        </div>
                    </section>
                    <footer className="flex flex-col gap-8">
                        <span className="flex gap-8 justify-center">
                            <button onClick={expandAll}>
                                <FolderOpenIcon className="mx-auto" />
                            </button>
                            <button onClick={foldAll}>
                                <FolderMinusIcon className="mx-auto" />
                            </button>
                        </span>
                        <button onClick={() => (window.location.href = '/')}>
                            <HomeIcon className="mx-auto" />
                        </button>
                    </footer>
                </div>
            </aside>

            <section className="h-full flex-1">
                <GraphView notes={notes} setFilter={setFilter} />
            </section>
        </main>
    );
};

export default GraphPage;
