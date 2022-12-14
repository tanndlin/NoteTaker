import React from 'react';
import './FileSystem.scss';

type FolderProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    toggleOpen: () => void;
};

const Folder = (props: FolderProps) => {
    return (
        <ul className={`folder ${props.isOpen ? '' : 'folded'} ml-8`}>
            <h1 className="cursor-pointer text-lg" onClick={props.toggleOpen}>
                {props.title}
            </h1>
            {props.children}
        </ul>
    );
};

export default Folder;
