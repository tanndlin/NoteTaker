import { FC, useContext } from 'react';
import { NoteContext } from '../../contexts/NoteContext';
import { Directory, StoredNote } from '../types';
import { File } from './File';
import Folder from './Folder';

type FolderViewProps = {
    filter: (note: StoredNote) => boolean;
    openStates: { [key: string]: boolean };
    setOpenStates: (openStates: { [key: string]: boolean }) => void;
    onClick: (note: StoredNote) => void;
};

export const FolderView: FC<FolderViewProps> = ({
    filter,
    onClick,
    openStates,
    setOpenStates
}) => {
    const { notes } = useContext(NoteContext);

    // Recursively create the file structure
    const createFileStructure = (heirarchy: Directory) => {
        return (
            <ul className="dirs">
                {heirarchy.notes.map((note) => (
                    <File note={note} key={note.id} onClick={onClick} />
                ))}
                {Object.keys(heirarchy.dirs).map((dir) => (
                    <Folder
                        title={dir.split('/').pop() || ''}
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
        <div className="h-full w-max temp">
            {createFileStructure(getHeirarchy(notes, filter))}
        </div>
    );
};

// This will display notes in a folder heirarchy according to their directory
export const getHeirarchy = (
    notes: StoredNote[],
    filter: (note: StoredNote) => boolean
) => {
    const heirarchy: Directory = { notes: [], dirs: {} };
    notes.forEach((note) => {
        const dir = note.directory;
        if (dir === '/') {
            heirarchy.notes.push(note);
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, ...dirs] = dir.split('/');
        let currentDir = heirarchy;
        let dirBuilder = '';
        dirs.forEach((dir) => {
            dirBuilder += `/${dir}`;
            if (!currentDir.dirs[dirBuilder]) {
                currentDir.dirs[dirBuilder] = { notes: [], dirs: {} };
            }
            currentDir = currentDir.dirs[dirBuilder];
        });

        if (filter(note)) {
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
