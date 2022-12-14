import React from 'react';

type EditProps = {
    body: string;
    edit: (body: string) => void;
};

export const Edit = (props: EditProps) => {
    return (
        <div className="w-full flex-1">
            <textarea
                className="text-black w-full h-full p-2 rounded-md"
                name="editInput"
                id="editInput"
                value={props.body}
                onChange={(e) => {
                    props.edit(e.target.value);
                }}
            />
        </div>
    );
};
