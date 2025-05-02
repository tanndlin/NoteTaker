import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { smoothTransition } from './utils';

type Props = {
    to: string;
    children: React.ReactNode;
    className?: string;
};

const AnimatedLink: FC<Props> = ({ to, children, className }) => {
    const navigate = useNavigate();

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        smoothTransition(() => {
            navigate(to);
        });
    };

    return (
        <a href={to} onClick={handleClick} className={className ?? ''}>
            {children}
        </a>
    );
};

export default AnimatedLink;
