import React from 'react';
import { FolderView, getHeirarchy } from './FolderView';
import FoldingOptions from './FoldingOptions';
import { Directory, Note } from '../types';

type FolderViewWrapperProps = {
    notes: Note[];
    createNote: () => number;
    className?: string;
};

// Self-sufficient wrapper for FolderView
const FolderViewWrapper = (props: FolderViewWrapperProps) => {
    const { notes, className } = props;

    const [openStates, setOpenStates] = React.useState(
        JSON.parse(localStorage.getItem('openStates') || '{}')
    );

    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        localStorage.setItem('openStates', JSON.stringify(openStates));
    }, [openStates]);

    const handleNew = () => {
        const id = props.createNote();
        window.location.href = `/${id}/edit`;
    };

    const expandAll = () => {
        const newOpenStates = { ...openStates };
        Object.keys(openStates).forEach((key) => {
            newOpenStates[key] = true;
        });
        setOpenStates(newOpenStates);
    };

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

        bfs(getHeirarchy(props.notes, searchTerm));
        setOpenStates(newOpenStates);
    }, [props.notes]);

    return (
        <div
            className={
                'rounded-md bg-secondary h-full py-6 px-4 overflow-y-auto overflow-x-hidden ' +
                className
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
                    {...{ notes, searchTerm, openStates, setOpenStates }}
                />
            </div>
        </div>
    );
};

export default FolderViewWrapper;
