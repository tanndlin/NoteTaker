import { FC } from 'react';
import MagnifyingGlassIcon from '../Icons/MagnifyingGlassIcon';
import { StoredNote } from '../types';

type FileProps = {
    note: StoredNote;
    onClick: (note: StoredNote) => void;
};

export const File: FC<FileProps> = ({ note, onClick }) => {
    return (
        <li key={note.id} className="flex ml-8 file">
            <a onClick={() => onClick(note)}>{note.title}</a>
            {note.changed && (
                <span className="w-2 h-2 ml-2 my-auto bg-orange-300 rounded-[50%]"></span>
            )}

            <MagnifyingGlassIcon className="w-4" />
        </li>
    );
};
