import React from 'react';

type EditProps = {
    markdown: string;
    setMarkdown: React.Dispatch<React.SetStateAction<string>>;
};

export const Edit = (props: EditProps) => {
    return (
        <div id="editContainer" className="w-full flex-1">
            <textarea
                className="text-black w-full h-full p-2 rounded-md"
                name="editInput"
                id="editInput"
                value={props.markdown}
                onChange={(e) => props.setMarkdown(e.target.value)}
            />
        </div>
    );
};
