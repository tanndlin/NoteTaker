import React, { useContext } from 'react';
import { NoteContext } from '../../contexts/NoteContext';
import { Directory, StoredNote } from '../types';
import { FolderView, getHeirarchy } from './FolderView';
import FoldingOptions from './FoldingOptions';

type FolderViewWrapperProps = {
    className?: string;
    onClick: (note: StoredNote) => void;
};

// Self-sufficient wrapper for FolderView
const FolderViewWrapper = (props: FolderViewWrapperProps) => {
    const { className, onClick } = props;
    const { notes, createNote } = useContext(NoteContext);

    const [searchTerm, setSearchTerm] = React.useState('');
    const [queue, _setQueue] = React.useState<string[]>([]);
    const [openStates, setOpenStates] = React.useState(
        JSON.parse(localStorage.getItem('openStates') || '{}')
    );

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    const search = (note: StoredNote) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase());

    const handleNew = () => {
        const id = createNote();
        window.location.href = `/${id}/edit`;
    };

    const expandAll = () => {
        const heirarchy = getHeirarchy(notes, search);
        const dfs = (dir: Directory) => {
            Object.keys(dir.dirs).forEach((key) => {
                queue.push(key);
                dfs(dir.dirs[key]);
            });
        };
        dfs(heirarchy);

        const key = queue.shift()!;
        setOpenStates({ ...openStates, [key]: true });
    };

    React.useEffect(() => {
        if (queue.length === 0) {
            return;
        }
        const key = queue.shift()!;

        setTimeout(() => {
            setOpenStates({ ...openStates, [key]: true });
        }, 100);
    }, [openStates]);

    const foldAll = () => {
        const newOpenStates = { ...openStates };
        Object.keys(openStates).forEach((key) => {
            newOpenStates[key] = false;
        });
        setOpenStates(newOpenStates);
    };

    // Make sure all dirs are in the open states
    React.useEffect(() => {
        const newOpenStates = { ...openStates };
        const bfs = (dir: Directory) => {
            Object.keys(dir.dirs).forEach((key) => {
                if (newOpenStates[key] === undefined) {
                    newOpenStates[key] = true;
                }
                bfs(dir.dirs[key]);
            });
        };

        bfs(getHeirarchy(notes, search));
        setOpenStates(newOpenStates);
    }, [notes]);

    return (
        <div
            className={
                'rounded-md bg-secondary h-full px-4 overflow-y-auto overflow-x-hidden' +
                (className ? ` ${className}` : '')
            }
        >
            <header className="sticky top-0 z-50 flex justify-between pt-4 mb-8 bg-secondary">
                <h2 className="text-xl">Notes</h2>
                <div className="flex gap-4">
                    <FoldingOptions {...{ expandAll, foldAll, handleNew }} />
                    <input
                        className="px-2 py-1 rounded-md"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                            expandAll();
                            setSearchTerm(e.target.value);
                        }}
                    />
                </div>
            </header>
            <div>
                <FolderView
                    {...{
                        filter: search,
                        openStates,
                        setOpenStates,
                        onClick
                    }}
                />
            </div>
        </div>
    );
};

export default FolderViewWrapper;
