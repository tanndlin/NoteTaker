import React from 'react';
import { Note } from '../../../common/types';

type FileProps = {
    note: Note;
};

export const File = (props: FileProps) => {
    const { note } = props;

    return (
        <li key={note.id} className="ml-8">
            <a href={`/${note.id}/edit`}>{note.title}</a>
        </li>
    );
};
