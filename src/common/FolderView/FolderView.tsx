import React from 'react';
import { Directory, Note } from '../types';
import { File } from './File';
import Folder from './Folder';

type FolderViewProps = {
    notes: Note[];
    searchTerm: string;
    openStates: { [key: string]: boolean };
    setOpenStates: (openStates: { [key: string]: boolean }) => void;
};

export const FolderView = (props: FolderViewProps) => {
    const { notes, searchTerm, openStates, setOpenStates } = props;

    // Recursively create the file structure
    const createFileStructure = (heirarchy: Directory) => {
        return (
            <ul className="dirs">
                {heirarchy.notes.map((note) => (
                    <File note={note} key={note.id} />
                ))}
                {Object.keys(heirarchy.dirs).map((dir) => (
                    <Folder
                        title={dir}
                        key={dir}
                        isOpen={openStates[dir]}
                        toggleOpen={() =>
                            setOpenStates({
                                ...openStates,
                                [dir]: !openStates[dir]
                            })
                        }
                    >
                        {createFileStructure(heirarchy.dirs[dir])}
                    </Folder>
                ))}
            </ul>
        );
    };

    return (
        <div className="w-full h-full">
            {createFileStructure(getHeirarchy(notes, searchTerm))}
        </div>
    );
};

const matchesSearch = (term: string, note: Note) => {
    if (!term) return true;
    if (!term.startsWith('text:'))
        return [note.title, note.directory].some((e) =>
            e.toLowerCase().includes(term.toLowerCase())
        );

    const text = term.substring(5);
    return note.body.toLowerCase().includes(text.toLowerCase());
};

// This will display notes in a folder heirarchy according to their directory
export const getHeirarchy = (notes: Note[], searchTerm: string) => {
    const heirarchy: Directory = { notes: [], dirs: {} };
    notes.forEach((note) => {
        const dir = note.directory;
        if (dir === '/') {
            heirarchy.notes.push(note);
            return;
        }

        const [_, ...dirs] = dir.split('/');
        let currentDir = heirarchy;
        dirs.forEach((dir) => {
            if (!currentDir.dirs[dir]) {
                currentDir.dirs[dir] = { notes: [], dirs: {} };
            }
            currentDir = currentDir.dirs[dir];
        });

        if (matchesSearch(searchTerm, note)) {
            currentDir.notes.push(note);
        }
    });

    // Prune empty directories
    const prune = (dir: Directory) => {
        Object.keys(dir.dirs).forEach((key) => {
            dir.dirs[key] = prune(dir.dirs[key]);
            if (
                dir.dirs[key].notes.length === 0 &&
                Object.keys(dir.dirs[key].dirs).length === 0
            ) {
                delete dir.dirs[key];
            }
        });

        return dir;
    };

    return prune(heirarchy);
};
