import React from 'react';
import { useParams } from 'react-router-dom';
import { Edit } from './Edit';
import Options from './Options';
import { Preview } from './Preview';
import { Note } from '../../common/types';
import EditableText from '../../components/EditableText/EditableText';
import './EditNote.scss';

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

    const createLinks = (body: string) => {
        const regex = /\]\(ref\((.+)\)\)/g;
        const matches = body.matchAll(regex);
        const refs = Array.from(matches).map((match) =>
            match[1].replace(/_/g, ' ')
        );

        console.log(refs);

        const findNoteFromRef = (ref: string) => {
            return props.notes.find(
                (note) => `${note.directory}/${note.title}` === ref
            );
        };

        const currentDepth = (note.directory.match(/\//g) || []).length;
        let newBody = body;
        refs.forEach((ref) => {
            const note = findNoteFromRef(ref);
            console.log(ref, note);

            if (!note) {
                return;
            }

            newBody = newBody.replace(
                `ref(${ref.replace(/ /g, '_')})`,
                `${'../'.repeat(currentDepth)}${note.id}/edit`
            );
        });

        return newBody;
    };

    React.useEffect(() => {
        console.log(createLinks(body));
    }, [body]);

    return (
        <main
            id="editPageContainer"
            className="grid grid-cols-3 w-screen h-full"
        >
            <p />
            <div className="px-8 h-full flex flex-col flex-grow">
                <EditableText
                    id="title"
                    className="text-3xl mb-8"
                    value={title}
                    onChange={(e) => {
                        edit({ ...note, title: e.target.value });
                    }}
                />
                <div className="flex flex-1 w-full">
                    <section className="w-1/2 mr-4 h-full flex flex-col flex-grow">
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
                        <Preview body={createLinks(body)} />
                    </section>
                </div>
            </div>
            <Options
                directory={directory}
                edit={(directory) => {
                    edit({ ...note, directory });
                }}
                deleteNote={deleteNote}
            />
        </main>
    );
};

export default EditNote;
