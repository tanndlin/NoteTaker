import React from 'react';
import './FileSystem.scss';

type FolderProps = {
    title: string;
    depth: number;
    children: React.ReactNode;
};

const Folder = (props: FolderProps) => {
    const [folded, setFolded] = React.useState(true);

    return (
        <ul
            className={`folder ${folded ? 'folded' : ''}`}
            style={{ marginLeft: `${props.depth * 2}rem` }}
        >
            <h1
                className="cursor-pointer text-lg"
                onClick={() => setFolded(!folded)}
            >
                {props.title}
            </h1>
            {props.children}
        </ul>
    );
};

export default Folder;
