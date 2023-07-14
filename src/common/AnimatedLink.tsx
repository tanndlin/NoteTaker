import React from 'react';
import { useNavigate } from 'react-router';

type Props = {
    to: string;
    children: React.ReactNode;
};

const AnimatedLink = (props: Props) => {
    const { to, children } = props;
    const navigate = useNavigate();

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).startViewTransition(() => {
            navigate(to);
        });
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
};

export default AnimatedLink;
