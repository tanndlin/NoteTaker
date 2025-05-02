import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
    AuthIsNotSignedIn,
    AuthIsSignedIn,
    AuthProvider
} from './contexts/AuthContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { NoteProvider } from './contexts/NoteContext';
import AboutPage from './pages/about/AboutPage';
import EditNote from './pages/edit/EditNotePage';
import GraphPage from './pages/graph/GraphPage';
import { HomePage } from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import SettingsPage from './pages/settings/SettingsPage';
import ViewNotePage from './pages/view/ViewNotePage';

function App() {
    return (
        <AuthProvider>
            <div className="w-screen h-screen py-4">
                <AuthIsSignedIn>
                    <ConfigProvider>
                        <NoteProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/:id">
                                        <Route
                                            index
                                            element={<ViewNotePage />}
                                        />
                                        <Route
                                            path="edit"
                                            element={<EditNote />}
                                        />
                                    </Route>
                                    <Route
                                        path="/graph"
                                        element={<GraphPage />}
                                    />
                                    <Route
                                        path="/settings"
                                        element={<SettingsPage />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<LoginPage />}
                                    />
                                    <Route
                                        path="/about"
                                        element={<AboutPage />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate to="/" />}
                                    />
                                </Routes>
                            </BrowserRouter>
                        </NoteProvider>
                    </ConfigProvider>
                </AuthIsSignedIn>
                <AuthIsNotSignedIn>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route
                                path="*"
                                element={<Navigate to="/login" />}
                            />
                        </Routes>
                    </BrowserRouter>
                </AuthIsNotSignedIn>
            </div>
        </AuthProvider>
    );
}

export default App;
