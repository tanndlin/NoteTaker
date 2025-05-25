import { useNavigate } from 'react-router-dom';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';
import { StoredNote } from '../../common/types';
import { smoothTransition } from '../../common/utils';

export const HomePage = () => {
    const navigate = useNavigate();

    const onClick = (note: StoredNote) => {
        smoothTransition(() => navigate(`/${note.id}`));
    };

    return (
        <main className="container flex flex-col h-full p-8 mx-auto">
            <header className="flex justify-between">
                <h1 className="text-4xl font-bold page-title">Home</h1>
            </header>
            <article className="container p-4 mt-16 overflow-auto rounded-md bg-secondary min-h-1/2 folder-view">
                <FolderViewWrapper onClick={onClick} />
            </article>
        </main>
    );
};
