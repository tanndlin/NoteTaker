import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';
import { NoteProvider } from './contexts/NoteContext';
import AboutPage from './pages/about/AboutPage';
import EditNote from './pages/edit/EditNotePage';
import GraphPage from './pages/graph/GraphPage';
import { HomePage } from './pages/home/HomePage';
import SettingsPage from './pages/settings/SettingsPage';
import ViewNotePage from './pages/view/ViewNotePage';

function App() {
    return (
        <ConfigProvider>
            <NoteProvider>
                <div className="w-screen h-screen py-4">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/:id">
                                <Route index element={<ViewNotePage />} />
                                <Route path="edit" element={<EditNote />} />
                            </Route>
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/graph" element={<GraphPage />} />
                            <Route
                                path="/settings"
                                element={<SettingsPage />}
                            />
                            <Route path="**" element={<Navigate to="/" />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </NoteProvider>
        </ConfigProvider>
    );
}

export default App;
