import React from 'react';
import { ButtonBar } from '../../common/ButtonBar/ButtonBar';
import EditIcon from '../../common/Icons/EditIcon';
import HomeIcon from '../../common/Icons/HomeIcon';
import { Note } from '../../common/types';

type PreviewOptionsProps = {
    note: Note;
};

const ViewOptions = (props: PreviewOptionsProps) => {
    const { directory, id } = props.note;

    const gotoEdit = () => {
        window.location.href = `/${id}/edit`;
    };

    return (
        <aside className="mt-16">
            <h2 className="text-center text-2xl mb-8">Options</h2>
            <div className="flex flex-col gap-8">
                <span className="flex flex-col">
                    <label htmlFor="directory">Directory</label>
                    <h2>{directory}</h2>
                </span>
                <ButtonBar>
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        <HomeIcon className="mx-auto" />
                    </button>
                    <button onClick={gotoEdit}>
                        <EditIcon className="mx-auto" />
                    </button>
                </ButtonBar>
            </div>
        </aside>
    );
};

export default ViewOptions;
