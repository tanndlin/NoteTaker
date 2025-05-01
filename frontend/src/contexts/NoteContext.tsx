import { GetNotesResponse } from '@backend/types';
import React, { useContext, useEffect } from 'react';
import { apiFetch } from '../common/fetch';
import { INoteContext, Note } from '../common/types';
import { AuthContext, AuthStatus } from './AuthContext';

const NoteContext = React.createContext<INoteContext>({} as INoteContext);

type Props = { children: React.ReactNode };
const NoteProvider = ({ children }: Props) => {
    const { authStatus, user, token } = useContext(AuthContext);
    const [notes, setNotes] = React.useState<Note[]>([]);
    const { res, error, loading, fetchData } = apiFetch<GetNotesResponse>({
        method: 'GET',
        endpoint: 'notes',
        token
    });

    useEffect(() => {
        if (authStatus === AuthStatus.SignedIn) {
            fetchData();
        }
    }, [authStatus]);

    useEffect(() => {
        if (res) {
            setNotes(res.notes);
        }
    }, [res]);

    React.useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNote = (options?: { title?: string; directory?: string }) => {
        if (!options) {
            options = { title: 'Title', directory: '/' };
        }

        const newNote = {
            id: Date.now(),
            title: options.title ?? 'Title',
            body: `# ${options.title ?? 'Hello World'}`,
            directory: options.directory ?? '/'
        };
        setNotes([...notes, newNote]);

        return newNote.id;
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, createNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
