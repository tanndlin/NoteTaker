import React from 'react';
import { ButtonBar } from '../../common/ButtonBar/ButtonBar';
import EditIcon from '../../common/Icons/EditIcon';
import HomeIcon from '../../common/Icons/HomeIcon';

type PreviewOptionsProps = {
    directory: string;
};

const ViewOptions = (props: PreviewOptionsProps) => {
    const gotoEdit = () => {
        const id = window.location.pathname.split('/')[1];
        window.location.href = `/${id}/edit`;
    };

    return (
        <aside className="mt-16 mx-8">
            <h2 className="text-center text-2xl mb-8">Options</h2>
            <div className="flex flex-col gap-8">
                <span className="flex flex-col">
                    <label htmlFor="directory">Directory</label>
                    <h2>{props.directory}</h2>
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
