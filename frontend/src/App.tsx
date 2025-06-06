import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
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
import SearchPage from './pages/search/SearchPage';
import SettingsPage from './pages/settings/SettingsPage';
import ViewNotePage from './pages/view/ViewNotePage';

function App() {
    return (
        <AuthProvider>
            <div className="flex flex-col w-screen h-screen">
                <AuthIsSignedIn>
                    <ConfigProvider>
                        <NoteProvider>
                            <BrowserRouter>
                                <Header />
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
                                        path="/search"
                                        element={<SearchPage />}
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
