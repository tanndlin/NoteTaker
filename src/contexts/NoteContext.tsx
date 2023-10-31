import React from 'react';
import { INoteContext } from '../common/types';

const NoteContext = React.createContext<INoteContext>({} as INoteContext);

type Props = { children: React.ReactNode | React.ReactNode[] };
const NoteProvider = (props: Props) => {
    const { children } = props;
    const [notes, setNotes] = React.useState(
        JSON.parse(localStorage.getItem('notes') || '[]')
    );
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
