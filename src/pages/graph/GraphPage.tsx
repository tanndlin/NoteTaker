import React from 'react';
import { FolderView } from '../../common/FolderView/FolderView';
import FolderMinusIcon from '../../common/Icons/FolderMinusIcon';
import FolderOpenIcon from '../../common/Icons/FolderOpenIcon';
import HomeIcon from '../../common/Icons/HomeIcon';
import { Note } from '../../common/types';
import GraphView from './components/GraphView';

type GraphPageProps = {
    notes: Note[];
};

const GraphPage = (props: GraphPageProps) => {
    const { notes } = props;
    const [openStates, setOpenStates] = React.useState<{
        [key: string]: boolean;
    }>(JSON.parse(localStorage.getItem('openStates') || '{}'));

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

    return (
        <main className="flex h-full flex-grow">
            <aside className="bg-secondary h-full p-4 flex">
                <div className="flex flex-col justify-between">
                    <section>
                        <h1 className="w-min">Files</h1>
                        <div>
                            <FolderView
                                {...{
                                    notes,
                                    searchTerm: '',
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
                <GraphView notes={notes} />
            </section>
        </main>
    );
};

export default GraphPage;
