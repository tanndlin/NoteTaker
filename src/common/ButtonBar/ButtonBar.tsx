import React from 'react';
import './ButtonBar.scss';

type ButtonBarProps = {
    children: React.ReactNode;
};

export const ButtonBar = (props: ButtonBarProps) => {
    return <span className="buttonBar">{props.children}</span>;
};
