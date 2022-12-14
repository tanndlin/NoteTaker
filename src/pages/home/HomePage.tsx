import React from 'react';
import { Note } from '../../common/types';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
};

const HomePage = (props: HomePageProps) => {
    const handleNew = () => {
        const id = props.createNote();
        window.location.href = `/${id}/edit`;
    };

    return (
        <main className="container mx-auto h-full p-8 flex flex-col">
            <header className="flex justify-between">
                <h1 className="text-4xl font-bold">Home</h1>
                <button onClick={handleNew}>New Note</button>
            </header>
            <article className="bg-secondary w-full min-h-1/2 my-auto p-4">
                <header className="flex justify-between">
                    <h2 className="text-xl">Notes</h2>
                    <input
                        className="rounded-md px-2 py-1"
                        type="text"
                        placeholder="Search"
                    />
                </header>
                <ul>
                    {props.notes.map((note) => (
                        <li key={note.id}>
                            <a href={`/notes/${note.id}`}>{note.title}</a>
                        </li>
                    ))}
                </ul>
            </article>
        </main>
    );
};

export default HomePage;
