import React from 'react';
import EditableText from '../../components/EditableText/EditableText';

type OptionsProps = {
    directory: string;
    edit: (directory: string) => void;
};

const Options = (props: OptionsProps) => {
    return (
        <aside className="mt-16 mx-8">
            <h2 className="text-center text-2xl mb-8">Options</h2>
            <div className="flex flex-col">
                <label htmlFor="directory">Directory</label>
                <EditableText
                    id="directory"
                    value={props.directory}
                    onChange={(e) => {
                        props.edit(e.target.value);
                    }}
                />
            </div>
        </aside>
    );
};

export default Options;
