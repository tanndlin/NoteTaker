import React from 'react';
import { ButtonBar } from '../../common/ButtonBar/ButtonBar';
import HomeIcon from '../../common/Icons/HomeIcon';
import MagnifyingGlassIcon from '../../common/Icons/MagnifyingGlassIcon';
import TrashIcon from '../../common/Icons/TrashIcon';
import EditableText from '../../components/EditableText/EditableText';
import PotentialRefs from './components/PotentialRefs';
import { Note } from '../../common/types';

type OptionsProps = {
    directory: string;
    edit: (newKeys: any) => void;
    deleteNote: () => void;
    note: Note;
    notes: Note[];
};

const Options = (props: OptionsProps) => {
    const gotoView = () => {
        const id = window.location.pathname.split('/')[1];
        window.location.href = `/${id}`;
    };

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
                            let val = e.target.value;
                            if (!val.startsWith('/')) val = '/' + val;
                            props.edit({ directory: val });
                        }}
                    />
                </span>
                <ButtonBar>
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        <HomeIcon className="mx-auto" />
                    </button>
                    <button onClick={gotoView}>
                        <MagnifyingGlassIcon className="mx-auto" />
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-400"
                        onClick={props.deleteNote}
                    >
                        <TrashIcon className="mx-auto" />
                    </button>
                </ButtonBar>
                <PotentialRefs
                    notes={props.notes}
                    note={props.note}
                    edit={props.edit}
                />
            </div>
        </aside>
    );
};

export default Options;
