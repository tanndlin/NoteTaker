import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Note } from './common/types';
import AboutPage from './pages/about/AboutPage';
import EditNote from './pages/edit/EditNotePage';
import GraphPage from './pages/graph/GraphPage';
import { HomePage } from './pages/home/HomePage';
import SettingsPage from './pages/settings/SettingsPage';
import ViewNotePage from './pages/view/ViewNotePage';

function App() {
    const [notes, setNotes] = React.useState(
        JSON.parse(localStorage.getItem('notes') || '[]') as Note[]
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
        <div className="w-screen h-screen py-4">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage {...{ notes, createNote }} />}
                    />
                    <Route path="/:id">
                        <Route
                            index
                            element={
                                <ViewNotePage {...{ notes, createNote }} />
                            }
                        />
                        <Route
                            path="edit"
                            element={
                                <EditNote
                                    {...{ notes, createNote, setNotes }}
                                />
                            }
                        />
                    </Route>
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                        path="/graph"
                        element={
                            <GraphPage
                                notes={notes}
                                createNote={(qualifiedName: string) => {
                                    const split = qualifiedName.split('/');
                                    const title = split[split.length - 1];

                                    // dir is everything before the last
                                    const directory = split
                                        .slice(0, split.length - 1)
                                        .join('/');
                                    const id = createNote({ title, directory });

                                    window.location.href = `/${id}`;
                                }}
                            />
                        }
                    />
                    <Route
                        path="/settings"
                        element={<SettingsPage notes={notes} />}
                    />
                    <Route path="**" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
