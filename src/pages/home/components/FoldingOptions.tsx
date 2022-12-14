import React from 'react';

type FolderOptionsProps = {
    openStates: { [key: string]: boolean };
    setOpenStates: (openStates: { [key: string]: boolean }) => void;
    handleNew: () => void;
};

const FoldingOptions = (props: FolderOptionsProps) => {
    const expandAll = () => {
        const openStates: { [key: string]: boolean } = {};
        Object.keys(props.openStates).forEach((key) => {
            openStates[key] = true;
        });
        props.setOpenStates(openStates);
    };

    const foldAll = () => {
        const openStates: { [key: string]: boolean } = {};
        Object.keys(props.openStates).forEach((key) => {
            openStates[key] = false;
        });
        props.setOpenStates(openStates);
    };

    return (
        <span className="flex justify-between gap-4">
            <button className="bg-transparent" onClick={props.handleNew}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
            <button className="bg-transparent" onClick={expandAll}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                </svg>
            </button>
            <button className="bg-transparent" onClick={foldAll}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                </svg>
            </button>
        </span>
    );
};

export default FoldingOptions;
