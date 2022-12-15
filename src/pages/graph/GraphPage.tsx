import React from 'react';
import { FolderView } from '../../common/FolderView/FolderView';
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

    return (
        <main className="flex h-full flex-grow">
            <aside className="bg-secondary h-full p-4">
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
            </aside>

            <section className="h-full flex-1">
                <GraphView notes={notes} />
            </section>
        </main>
    );
};

export default GraphPage;
