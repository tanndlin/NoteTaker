import { useContext } from 'react';
import { NoteContext } from '../../contexts/NoteContext';
import FolderMinusIcon from '../Icons/FolderMinusIcon';
import FolderOpenIcon from '../Icons/FolderOpenIcon';
import PlusIcon from '../Icons/PlusIcon';
import RefreshIcon from '../Icons/RefreshIcon';

type FolderOptionsProps = {
    expandAll: () => void;
    foldAll: () => void;
};

const FoldingOptions = ({ expandAll, foldAll }: FolderOptionsProps) => {
    const { updateAllNotes } = useContext(NoteContext);
    const { notes, createNote } = useContext(NoteContext);

    const handleNew = () => {
        const id = createNote();
        window.location.href = `/${id}/edit`;
    };

    return (
        <span className="flex justify-between gap-4">
            <button className="!bg-transparent" onClick={handleNew}>
                <PlusIcon />
            </button>
            <button className="!bg-transparent" onClick={expandAll}>
                <FolderOpenIcon />
            </button>
            <button className="!bg-transparent" onClick={foldAll}>
                <FolderMinusIcon />
            </button>
            {notes.filter((n) => n.changed).length > 0 && (
                <button className="!bg-transparent" onClick={updateAllNotes}>
                    <RefreshIcon />
                </button>
            )}
        </span>
    );
};

export default FoldingOptions;
