import React from 'react';
import { Note } from '../../common/types';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
};

export const HomePage = (props: HomePageProps) => {
    const { notes, createNote } = props;

    const onClick = (id: number) => {
        window.location.href = `/${id}`;
    };

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
            <article className="bg-secondary container min-h-1/2 mt-16 p-4 rounded-md overflow-auto">
                <FolderViewWrapper {...{ notes, createNote, onClick }} />
            </article>
        </main>
    );
};
