import React from 'react';
import { Note } from '../../common/types';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
};

export const HomePage = (props: HomePageProps) => {
    const { notes, createNote } = props;

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
                <FolderViewWrapper {...{ notes, createNote }} />
            </article>
        </main>
    );
};
