import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FolderViewMinWrapper from '../../common/FolderView/FolderViewMinWrapper';
import { Preview } from '../../common/Preview/Preview';
import { Note } from '../../common/types';
import { smoothTransition } from '../../common/utils';
import EditableText from '../../components/EditableText/EditableText';
import { ConfigContext } from '../../contexts/ConfigContext';
import { NoteContext } from '../../contexts/NoteContext';
import './EditNote.scss';
import Options from './Options';
import { Edit } from './components/Edit';
import Stats from './components/Stats';

const EditNote = () => {
    const { notes, setNotes } = useContext(NoteContext);
    const { configs } = useContext(ConfigContext);
    const navigate = useNavigate();

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
        <main id="editPageContainer" className="grid w-full h-full grid-cols-3">
            <div className="h-full p-4 ml-8 mt-[134px] flex flex-col max-h-[85vh] folder-view bg-secondary rounded-md">
                <h1 className="mb-8 ml-8 text-2xl">Files</h1>
                <FolderViewMinWrapper
                    onClick={(note: Note) =>
                        smoothTransition(() => navigate(`/${note.id}/edit`))
                    }
                />
            </div>
            <div className="flex flex-col flex-1 px-8">
                <EditableText
                    id="title"
                    className="mb-8 text-3xl"
                    value={title}
                    onChange={(e) => {
                        edit({ ...note, title: e.target.value });
                    }}
                />
                <div
                    id="editTwoPane"
                    className="flex w-full flex-1 max-h-[85vh]"
                >
                    <section className="flex flex-col flex-grow w-1/2 mr-4">
                        <h2 className="w-full mb-8 text-2xl text-center">
                            Edit
                        </h2>
                        <Edit
                            body={body}
                            edit={(body) => {
                                edit({ ...note, body });
                            }}
                        />
                    </section>
                    <section className="flex flex-col flex-grow w-1/2 pl-4 border-l-2 border-tertiary">
                        <h2 className="w-full mb-8 text-2xl text-center">
                            Preview
                        </h2>
                        <Preview note={note} notes={notes} />
                    </section>
                </div>
            </div>
            <div>
                <Options
                    directory={directory}
                    edit={(newKeys) => {
                        edit({ ...note, ...newKeys });
                    }}
                    deleteNote={deleteNote}
                    note={note}
                />
                <Stats note={note} notes={notes} />
            </div>
        </main>
    );
};

export default EditNote;
