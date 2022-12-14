import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NewNote from './pages/new/NewNotePage';

function App() {
    return (
        <div className="container py-4 h-screen w-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="new" element={<NewNote />} />
                    <Route path="/:id">
                        <Route index element={<h1>Show</h1>} />
                        <Route path="edit" element={<h1>Edit</h1>} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
