import React from 'react';
import { FolderView, getHeirarchy } from './FolderView';
import FoldingOptions from './FoldingOptions';
import { Directory, Note } from '../types';

type FolderViewWrapperProps = {
    notes: Note[];
    createNote: () => number;
    className?: string;
    onClick: (id: number) => void;
};

// Self-sufficient wrapper for FolderView
const FolderViewWrapper = (props: FolderViewWrapperProps) => {
    const { notes, className, onClick } = props;

    const [searchTerm, setSearchTerm] = React.useState('');
    const [queue, _setQueue] = React.useState<string[]>([]);
    const [openStates, setOpenStates] = React.useState(
        JSON.parse(localStorage.getItem('openStates') || '{}')
    );

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    const search = (note: Note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase());

    const handleNew = () => {
        const id = props.createNote();
        window.location.href = `/${id}/edit`;
    };

    const expandAll = () => {
        const heirarchy = getHeirarchy(props.notes, search);
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
        if (queue.length === 0) return;
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

        bfs(getHeirarchy(props.notes, search));
        setOpenStates(newOpenStates);
    }, [props.notes]);

    return (
        <div
            className={
                'rounded-md bg-secondary h-full px-4 overflow-y-auto overflow-x-hidden' +
                (className ? ` ${className}` : '')
            }
        >
            <header className="flex justify-between mb-8 sticky top-0 bg-secondary z-50 pt-4">
                <h2 className="text-xl">Notes</h2>
                <div className="flex gap-4">
                    <FoldingOptions {...{ expandAll, foldAll, handleNew }} />
                    <input
                        className="rounded-md px-2 py-1"
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
                        notes,
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
