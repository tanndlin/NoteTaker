import React from 'react';
import { useParams } from 'react-router-dom';
import { Edit } from './components/Edit';
import Options from './Options';
import { Preview } from '../../common/Preview/Preview';
import { Note } from '../../common/types';
import EditableText from '../../components/EditableText/EditableText';
import './EditNote.scss';
import { createLinks } from '../../common/bodyToView';

type EditNoteProps = {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const EditNote = (props: EditNoteProps) => {
    const { id } = useParams();
    const note = props.notes.find((note) => note.id === Number(id));
    if (!note) {
        return <h1>404</h1>;
    }

    const { title, body, directory } = note;

    const edit = (note: Note) => {
        const newNotes = props.notes.map((n) => {
            if (n.id === note.id) {
                return note;
            }
            return n;
        });
        props.setNotes(newNotes);
    };

    const deleteNote = () => {
        const newNotes = props.notes.filter((n) => n.id !== note.id);
        props.setNotes(newNotes);

        window.location.href = '/';
    };

    return (
        <main id="editPageContainer" className="grid grid-cols-3 w-full h-full">
            <p id="fakeElement" />
            <div className="px-8 flex flex-1 flex-col">
                <EditableText
                    id="title"
                    className="text-3xl mb-8"
                    value={title}
                    onChange={(e) => {
                        edit({ ...note, title: e.target.value });
                    }}
                />
                <div
                    id="editTwoPane"
                    className="flex w-full flex-1 max-h-[85vh]"
                >
                    <section className="w-1/2 mr-4 flex flex-col flex-grow">
                        <h2 className="text-2xl text-center w-full mb-8">
                            Edit
                        </h2>
                        <Edit
                            body={body}
                            edit={(body) => {
                                edit({ ...note, body });
                            }}
                        />
                    </section>
                    <section className="w-1/2 pl-4 border-l-2 border-tertiary flex flex-col flex-grow">
                        <h2 className="text-2xl text-center w-full mb-8">
                            Preview
                        </h2>
                        <Preview body={createLinks(note, props.notes)} />
                    </section>
                </div>
            </div>
            <Options
                directory={directory}
                edit={(newKeys) => {
                    edit({ ...note, ...newKeys });
                }}
                deleteNote={deleteNote}
                notes={props.notes}
                note={note}
            />
        </main>
    );
};

export default EditNote;
