import React from 'react';
import { FolderView, getHeirarchy } from '../../common/FolderView/FolderView';
import { Directory, Note } from '../../common/types';
import FoldingOptions from './components/FoldingOptions';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
};

export const HomePage = (props: HomePageProps) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [openStates, setOpenStates] = React.useState<{
        [key: string]: boolean;
    }>(JSON.parse(localStorage.getItem('openStates') || '{}'));

    const handleNew = () => {
        const id = props.createNote();
        window.location.href = `/${id}/edit`;
    };

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

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    React.useEffect(() => {
        // Make sure all dirs are in the open states
        const newOpenStates = { ...openStates };
        const bfs = (dir: Directory) => {
            Object.keys(dir.dirs).forEach((key) => {
                if (newOpenStates[key] === undefined) {
                    newOpenStates[key] = true;
                }
                bfs(dir.dirs[key]);
            });
        };

        bfs(getHeirarchy(props.notes, searchTerm));
        setOpenStates(newOpenStates);
    }, [props.notes]);

    return (
        <main className="container mx-auto h-full p-8 flex flex-col">
            <header className="flex justify-between">
                <h1 className="text-4xl font-bold">Home</h1>
                <span className="flex flex-col">
                    <a className="text-xl" href="/about">
                        About
                    </a>
                    <a className="text-xl" href="/graph">
                        Graph
                    </a>
                </span>
            </header>
            <article className="bg-secondary container min-h-1/2 my-auto p-4 pt-0 rounded-md overflow-auto">
                <header className="flex justify-between mb-8 sticky top-0 bg-secondary z-50 pt-4">
                    <h2 className="text-xl">Notes</h2>
                    <div className="flex gap-4">
                        <FoldingOptions
                            {...{ expandAll, foldAll, handleNew }}
                        />
                        <input
                            className="rounded-md px-2 py-1"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => {
                                expandAll();
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </div>
                </header>
                <section className="pb-4">
                    <FolderView
                        {...{
                            notes: props.notes,
                            searchTerm,
                            openStates,
                            setOpenStates
                        }}
                    />
                </section>
            </article>
        </main>
    );
};
