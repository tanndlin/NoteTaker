import React from 'react';
import { useParams } from 'react-router-dom';
import FolderViewMinWrapper from '../../common/FolderView/FolderViewMinWrapper';
import { Preview } from '../../common/Preview/Preview';
import { createLinks } from '../../common/bodyToView';
import { Note } from '../../common/types';
import EditableText from '../../components/EditableText/EditableText';
import './EditNote.scss';
import Options from './Options';
import { Edit } from './components/Edit';

type EditNoteProps = {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const EditNote = (props: EditNoteProps) => {
    const { notes, setNotes } = props;

    const { id } = useParams();
    const note = notes.find((note) => note.id === Number(id));
    if (!note) {
        return <h1>404</h1>;
    }

    document.title = note.title;

    const { title, body, directory } = note;

    const edit = (note: Note) => {
        const newNotes = notes.map((n) => {
            if (n.id === note.id) {
                return note;
            }
            return n;
        });
        setNotes(newNotes);
    };

    const deleteNote = () => {
        const newNotes = notes.filter((n) => n.id !== note.id);
        setNotes(newNotes);

        window.location.href = '/';
    };

    return (
        <main id="editPageContainer" className="grid grid-cols-3 w-full h-full">
            <div className="h-full p-4 pt-16 flex flex-col max-h-[85vh]">
                <h1 className="text-2xl mb-8 mx-auto">Files</h1>
                <FolderViewMinWrapper
                    notes={notes}
                    onClick={(note: Note) =>
                        (window.location.href = `/${note.id}/edit`)
                    }
                />
            </div>
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
                        <Preview
                            body={createLinks(note, notes)}
                            notes={notes}
                        />
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
