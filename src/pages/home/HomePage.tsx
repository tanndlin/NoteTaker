import React from 'react';
import { Note } from '../../common/types';
import { File } from './components/File';
import Folder from './components/Folder';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
};

type Directory = {
    notes: Note[];
    dirs: { [key: string]: Directory };
};

const HomePage = (props: HomePageProps) => {
    const handleNew = () => {
        const id = props.createNote();
        window.location.href = `/${id}/edit`;
    };

    // This will display notes in a folder heirarchy according to their directory
    const getHeirarchy = (notes: Note[]) => {
        const heirarchy: Directory = { notes: [], dirs: {} };
        notes.forEach((note) => {
            const dir = note.directory;
            const [_, ...dirs] = dir.split('/');
            let currentDir = heirarchy;
            dirs.forEach((dir) => {
                if (!currentDir.dirs[dir]) {
                    currentDir.dirs[dir] = { notes: [], dirs: {} };
                }
                currentDir = currentDir.dirs[dir];
            });

            currentDir.notes.push(note);
        });

        return heirarchy;
    };

    // Recursively create the file structure
    const createFileStructure = (heirarchy: Directory, depth: number) => {
        return (
            <ul>
                {heirarchy.notes.map((note) => (
                    <File note={note} key={note.id} />
                ))}
                {Object.keys(heirarchy.dirs).map((dir) => (
                    <Folder title={dir} depth={depth} key={dir}>
                        {createFileStructure(heirarchy.dirs[dir], depth + 1)}
                    </Folder>
                ))}
            </ul>
        );
    };

    return (
        <main className="container mx-auto h-full p-8 flex flex-col">
            <header className="flex justify-between">
                <h1 className="text-4xl font-bold">Home</h1>
                <button onClick={handleNew}>New Note</button>
            </header>
            <article className="bg-secondary w-full min-h-1/2 my-auto p-4">
                <header className="flex justify-between mb-8">
                    <h2 className="text-xl">Notes</h2>
                    <input
                        className="rounded-md px-2 py-1"
                        type="text"
                        placeholder="Search"
                    />
                </header>
                {createFileStructure(getHeirarchy(props.notes), 0)}
            </article>
        </main>
    );
};

export default HomePage;
