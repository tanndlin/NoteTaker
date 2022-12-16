import React from 'react';
import FolderMinusIcon from '../Icons/FolderMinusIcon';
import FolderOpenIcon from '../Icons/FolderOpenIcon';
import PlusIcon from '../Icons/PlusIcon';

type FolderOptionsProps = {
    handleNew: () => void;
    expandAll: () => void;
    foldAll: () => void;
};

const FoldingOptions = (props: FolderOptionsProps) => {
    return (
        <span className="flex justify-between gap-4">
            <button className="bg-transparent" onClick={props.handleNew}>
                <PlusIcon />
            </button>
            <button className="bg-transparent" onClick={props.expandAll}>
                <FolderOpenIcon />
            </button>
            <button className="bg-transparent" onClick={props.foldAll}>
                <FolderMinusIcon />
            </button>
        </span>
    );
};

export default FoldingOptions;
