import React from 'react';
import { Note } from '../types';
import MagnifyingGlassIcon from '../Icons/MagnifyingGlassIcon';

type FileProps = {
    note: Note;
    onClick: (note: Note) => void;
};

export const File = (props: FileProps) => {
    const { note, onClick } = props;

    return (
        <li key={note.id} className="file ml-8 flex">
            <a onClick={() => onClick(note)}>{note.title}</a>
            <MagnifyingGlassIcon className="w-4" />
        </li>
    );
};
