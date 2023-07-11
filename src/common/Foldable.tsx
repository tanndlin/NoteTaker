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
                className="bg-transparent hover:bg-transparent absolute left-0"
            >
                {open && <ChevronDownIcon className="w-4 h-4" />}
                {!open && (
                    <ChevronDownIcon className="w-4 h-4 transform -rotate-90" />
                )}
            </button>

            <div className="ml-6">
                <h1 className="title cursor-pointer" onClick={toggleOpen}>
                    {title}
                </h1>
                <div className="foldable-content">{children}</div>
            </div>
        </div>
    );
};

export default Foldable;
