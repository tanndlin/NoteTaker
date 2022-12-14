import React from 'react';

type EditProps = {
    markdown: string;
    setMarkdown: React.Dispatch<React.SetStateAction<string>>;
    tags: string[];
};

export const Edit = (props: EditProps) => {
    return (
        <>
            <h2 className="text-2xl text-center w-full mb-8">Edit</h2>
            <header className="flex mb-2">
                <ul className="flex ml-auto bg-secondary gap-4 max-w-1/3 justify-center rounded-md p-2">
                    {props.tags.map((tag) => (
                        <li className="bg-tertiary p-1 rounded-md">{tag}</li>
                    ))}
                </ul>
            </header>

            <div id="editContainer" className="w-full flex-1">
                <textarea
                    className="text-black w-full h-full p-2 rounded-md"
                    name="editInput"
                    id="editInput"
                    value={props.markdown}
                    onChange={(e) => props.setMarkdown(e.target.value)}
                />
            </div>
        </>
    );
};
