import React from 'react';
import './FileSystem.scss';

type FolderProps = {
    title: string;
    depth: number;
    children: React.ReactNode;
    isOpen: boolean;
    toggleOpen: () => void;
};

const Folder = (props: FolderProps) => {
    return (
        <ul
            className={`folder ${props.isOpen ? '' : 'folded'}`}
            style={{ marginLeft: `${props.depth * 2}rem` }}
        >
            <h1 className="cursor-pointer text-lg" onClick={props.toggleOpen}>
                {props.title}
            </h1>
            {props.children}
        </ul>
    );
};

export default Folder;
