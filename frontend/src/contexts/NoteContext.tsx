import {
    CreateNoteHeaders,
    CreateNoteResponse,
    DeleteNoteHeaders,
    DeleteNoteResponse,
    GetNotesResponse
} from '@backend/types';
import React, { useContext, useEffect } from 'react';
import { apiFetch } from '../common/fetch';
import { StoredNote } from '../common/types';
import { AuthContext, AuthStatus } from './AuthContext';

export interface INoteContext {
    notes: StoredNote[];
    setNotes: (notes: StoredNote[]) => void;
    createNote: (options?: { title?: string; directory?: string }) => void;
    editNote: (note: StoredNote) => void;
    deleteNote: (note: StoredNote) => void;
    updateAllNotes: () => void;
}

const NoteContext = React.createContext({} as INoteContext);

type Props = { children: React.ReactNode };
const NoteProvider = ({ children }: Props) => {
    const { authStatus, user, token } = useContext(AuthContext);
    const [notes, setNotes] = React.useState<StoredNote[]>(
        JSON.parse(localStorage.getItem('notes') ?? '[]')
    );
    const {
        res,
        error,
        loading,
        fetchData: fetchNotes
    } = apiFetch<GetNotesResponse>({
        method: 'GET',
        endpoint: 'notes',
        token
    });

    const { fetchData: updateNote } = apiFetch<
        CreateNoteResponse,
        CreateNoteHeaders
    >({
        endpoint: 'notes/create',
        method: 'POST',
        token: localStorage.getItem('token') ?? undefined
    });

    const { fetchData: deleteNoteApi } = apiFetch<
        DeleteNoteResponse,
        DeleteNoteHeaders
    >({
        endpoint: 'notes/delete',
        method: 'POST',
        token: localStorage.getItem('token') ?? undefined
    });

    useEffect(() => {
        if (authStatus === AuthStatus.SignedIn) {
            fetchNotes();
        }
    }, [authStatus]);

    useEffect(() => {
        if (!res || error) {
            return;
        }

        // Use the updatedAt timestamp to determine which note is newer
        // Overwrite the existing note if the one from the server is newer
        const { notes: notesFromServer } = res;
        const deletedIDs = notesFromServer
            .filter((note) => note.deleted === true)
            .map((note) => note.id);

        const nonDeletedNotes = notesFromServer.filter(
            (note) => note.deleted === false
        );

        const updatedNotes = nonDeletedNotes
            .map((note) => {
                const existingNote = notes.find((n) => n.id === note.id);
                const isNewer =
                    existingNote &&
                    existingNote.updatedAt > (note.updatedAt ?? 0);

                if (isNewer) {
                    existingNote.changed = true; // Mark as changed if the existing note is newer
                    return existingNote;
                }

                return {
                    ...note,
                    changed: false // Mark as not changed since it's from the server
                };
            })
            .filter((existingNote) => !deletedIDs.includes(existingNote.id));

        setNotes(updatedNotes);
    }, [res]);

    React.useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNote = (options?: { title?: string; directory?: string }) => {
        if (!options) {
            options = { title: 'Title', directory: '/' };
        }

        const newNote: StoredNote = {
            id: Date.now(),
            title: options.title ?? 'Title',
            body: `# ${options.title ?? 'Hello World'}`,
            directory: options.directory ?? '/',
            changed: true,
            updatedAt: Date.now(),
            deleted: false
        };
        setNotes([...notes, newNote]);

        updateNote(newNote);

        return newNote.id;
    };

    const editNote = (note: StoredNote) => {
        setNotes((prevNotes) =>
            prevNotes.map((oldNote) => {
                if (oldNote.id === note.id) {
                    return {
                        ...note,
                        changed: true,
                        updatedAt: Date.now()
                    };
                }

                return oldNote;
            })
        );
    };

    const deleteNote = (note: StoredNote) => {
        const updatedNotes = notes.filter((n) => n.id !== note.id);
        setNotes(updatedNotes);

        deleteNoteApi({ id: note.id, deleted: true });
    };

    const updateAllNotes = () => {
        notes
            .filter((note) => note.changed)
            .forEach((note) => {
                const { id, title, body, directory } = note;
                updateNote(
                    {
                        id,
                        title,
                        body,
                        directory
                    },
                    () => (note.changed = false)
                );
            });
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                setNotes,
                createNote,
                editNote,
                deleteNote,
                updateAllNotes
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
