import React from 'react';
import { useParams } from 'react-router-dom';
import { createLinks } from '../../common/bodyToView';
import { Note } from '../../common/types';
import { Preview } from '../../common/Preview';
import ViewOptions from './ViewOptions';
import './ViewNote.scss';
type ViewNoteProps = {
    notes: Note[];
};

const ViewNotePage = (props: ViewNoteProps) => {
    const { id } = useParams();
    const note = props.notes.find((note) => note.id === Number(id));
    if (!note) {
        return <h1>404</h1>;
    }
    return (
        <main
            id="previewPageContainer"
            className="grid grid-cols-3 w-screen h-full"
        >
            <p />
            <div className="px-8 h-full flex flex-col flex-grow">
                <h1 className="text-3xl mb-8">{note.title}</h1>
                <section className="flex flex-col flex-grow">
                    <Preview body={createLinks(note, props.notes)} />
                </section>
            </div>
            <ViewOptions directory={note.directory} />
        </main>
    );
};

export default ViewNotePage;
