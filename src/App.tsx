import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Note } from './common/types';
import { HomePage } from './pages/home/HomePage';
import EditNote from './pages/edit/EditNotePage';
import ViewNotePage from './pages/view/ViewNotePage';
import AboutPage from './pages/about/AboutPage';
import GraphPage from './pages/graph/GraphPage';

function App() {
    const [notes, setNotes] = React.useState(
        JSON.parse(localStorage.getItem('notes') || '[]') as Note[]
    );

    React.useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'Title',
            body: '# Hello World',
            directory: '/'
        };
        setNotes([...notes, newNote]);

        return newNote.id;
    };

    return (
        <div className="py-4 h-screen w-screen">
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
                        element={<GraphPage notes={notes} />}
                    />
                    <Route path="**" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
