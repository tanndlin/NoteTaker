import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Props = {
    title: string;
    className?: string;
    children: React.ReactNode;
};

const Foldable = (props: Props) => {
    const { title, children } = props;
    const [open, setOpen] = React.useState(true);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const className =
        (props.className ?? '') + ' foldable' + (open ? '' : ' folded');

    return (
        <div className={className}>
            <button
                onClick={toggleOpen}
                className="flex w-8 h-8 bg-transparent hover:bg-transparent"
            >
                {open && <ChevronDownIcon className="w-4 h-4 m-auto" />}
                {!open && (
                    <ChevronDownIcon className="w-4 h-4 m-auto transform -rotate-90" />
                )}
            </button>

            <div className="ml-2">
                <h1 className="h-8 align-middle cursor-pointer title" onClick={toggleOpen}>
                    <span>{title}</span>
                </h1>
                <div className="foldable-content">{children}</div>
            </div>
        </div>
    );
};

export default Foldable;
