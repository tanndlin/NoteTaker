import React from 'react';
import EditableText from '../../components/EditableText/EditableText';

type OptionsProps = {
    directory: string;
    edit: (directory: string) => void;
    deleteNote: () => void;
};

const Options = (props: OptionsProps) => {
    return (
        <aside className="mt-16 mx-8">
            <h2 className="text-center text-2xl mb-8">Options</h2>
            <div className="flex flex-col gap-8">
                <span className="flex flex-col">
                    <label htmlFor="directory">Directory</label>
                    <EditableText
                        id="directory"
                        value={props.directory}
                        onChange={(e) => {
                            props.edit(e.target.value);
                        }}
                    />
                </span>
                <span className="flex justify-between">
                    <button
                        className="w-[120px]"
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        Home
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-400"
                        onClick={props.deleteNote}
                    >
                        Delete Note
                    </button>
                </span>
            </div>
        </aside>
    );
};

export default Options;
