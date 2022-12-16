import React from 'react';
import { useParams } from 'react-router-dom';
import { createLinks } from '../../common/bodyToView';
import { Note } from '../../common/types';
import { Preview } from '../../common/Preview/Preview';
import ViewOptions from './ViewOptions';
import './ViewNote.scss';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';
type ViewNoteProps = {
    notes: Note[];
    createNote: () => number;
};

const ViewNotePage = (props: ViewNoteProps) => {
    const { notes, createNote } = props;

    const { id } = useParams();
    const note = props.notes.find((note) => note.id === Number(id));
    if (!note) {
        return <h1>404</h1>;
    }

    document.title = note.title;

    return (
        <div className="h-full">
            <header className="grid grid-cols-3 w-screen TriplePane px-8 h-1/10">
                <p />
                <h1 className="text-3xl mx-8 mb-8">{note.title}</h1>
                <p />
            </header>
            <main className="grid grid-cols-3 gap-8 TriplePane mx-8 h-9/10 pb-8">
                <FolderViewWrapper
                    {...{ notes, createNote, className: 'viewPageFolderView' }}
                />
                <Preview body={createLinks(note, props.notes)} />
                <ViewOptions directory={note.directory} />
            </main>
        </div>
    );
};

export default ViewNotePage;
