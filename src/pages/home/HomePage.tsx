import React from 'react';
import { Note } from '../../common/types';
import { File } from './components/File';
import Folder from './components/Folder';
import FoldingOptions from './components/FoldingOptions';

type HomePageProps = {
    notes: Note[];
    createNote: () => number;
};

type Directory = {
    notes: Note[];
    dirs: { [key: string]: Directory };
};

const HomePage = (props: HomePageProps) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [openStates, setOpenStates] = React.useState<{
        [key: string]: boolean;
    }>(JSON.parse(localStorage.getItem('openStates') || '{}'));

    const handleNew = () => {
        const id = props.createNote();
        window.location.href = `/${id}/edit`;
    };

    const matchesSearch = (term: string, note: Note) => {
        if (!term) return true;
        if (!term.startsWith('text:'))
            return note.title.toLowerCase() === term.toLowerCase();

        const text = term.substring(5);
        return note.body.toLowerCase().includes(text.toLowerCase());
    };

    // This will display notes in a folder heirarchy according to their directory
    const getHeirarchy = (notes: Note[], searchTerm: string) => {
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

            // Add the note to the open states if it's not already there
            if (!openStates[dir]) {
                setOpenStates({ ...openStates, [dir]: true });
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

    // Recursively create the file structure
    const createFileStructure = (heirarchy: Directory, depth: number) => {
        return (
            <ul>
                {heirarchy.notes.map((note) => (
                    <File note={note} key={note.id} />
                ))}
                {Object.keys(heirarchy.dirs).map((dir) => (
                    <Folder
                        title={dir}
                        depth={depth}
                        key={dir}
                        isOpen={openStates[dir]}
                        toggleOpen={() =>
                            setOpenStates({
                                ...openStates,
                                [dir]: !openStates[dir]
                            })
                        }
                    >
                        {createFileStructure(heirarchy.dirs[dir], depth + 1)}
                    </Folder>
                ))}
            </ul>
        );
    };

    React.useEffect(() => {
        console.log(openStates);
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    return (
        <main className="container mx-auto h-full p-8 flex flex-col">
            <header className="flex justify-between">
                <h1 className="text-4xl font-bold">Home</h1>
                <a className="text-xl" href="/about">
                    About
                </a>
            </header>
            <article className="bg-secondary w-full min-h-1/2 my-auto p-4 rounded-md">
                <header className="flex justify-between mb-8">
                    <h2 className="text-xl">Notes</h2>
                    <div className="flex gap-4">
                        <FoldingOptions
                            {...{ openStates, setOpenStates, handleNew }}
                        />
                        <input
                            className="rounded-md px-2 py-1"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>
                {createFileStructure(getHeirarchy(props.notes, searchTerm), 0)}
            </article>
        </main>
    );
};

export default HomePage;
