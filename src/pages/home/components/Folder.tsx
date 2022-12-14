import React from 'react';

type FolderProps = {
    title: string;
    depth: number;
    children: React.ReactNode;
};

const Folder = (props: FolderProps) => {
    return (
        <ul style={{ marginLeft: `${props.depth * 2}rem` }}>
            <h1>{props.title}</h1>
            {props.children}
        </ul>
    );
};

export default Folder;
