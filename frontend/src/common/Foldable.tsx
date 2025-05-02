import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';

type Props = {
    title: string;
    className?: string;
    children: React.ReactNode;
};

const Foldable: FC<Props> = ({ title, className, children }) => {
    const [open, setOpen] = React.useState(true);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const calculatedClassName =
        (className ?? '') + ' foldable' + (open ? '' : ' folded');

    return (
        <div className={calculatedClassName}>
            <button
                onClick={toggleOpen}
                className="flex w-8 h-8 !bg-transparent !hover:bg-transparent"
            >
                {open && <ChevronDownIcon className="w-4 h-4 m-auto" />}
                {!open && (
                    <ChevronDownIcon className="w-4 h-4 m-auto transform -rotate-90" />
                )}
            </button>

            <div className="ml-2">
                <h1
                    className="h-8 align-middle cursor-pointer title"
                    onClick={toggleOpen}
                >
                    <span>{title}</span>
                </h1>
                <div className="foldable-content">{children}</div>
            </div>
        </div>
    );
};

export default Foldable;
