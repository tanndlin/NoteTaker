import React from 'react';
import { useParams } from 'react-router-dom';
import { Note } from '../../common/types';
import './ViewNote.scss';
import TabContainer from '../../components/Tabs/TabContainer';
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

    return <TabContainer notes={notes} createNote={createNote} />;
};

export default ViewNotePage;
