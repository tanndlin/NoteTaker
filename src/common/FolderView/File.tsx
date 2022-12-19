import React from 'react';
import { Note } from '../types';
import MagnifyingGlassIcon from '../Icons/MagnifyingGlassIcon';

type FileProps = {
    note: Note;
};

export const File = (props: FileProps) => {
    const { note } = props;

    return (
        <li key={note.id} className="file ml-8 flex">
            <a href={`/${note.id}`}>{note.title}</a>
            <MagnifyingGlassIcon className="w-4" />
        </li>
    );
};
