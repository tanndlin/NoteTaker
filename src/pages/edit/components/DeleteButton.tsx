import { useState } from 'react';
import TrashIcon from '../../../common/Icons/TrashIcon';
import { Configs } from '../../../common/types';
import DeleteModal from './DeleteModal';

type Props = {
    name: string;
    deleteNote: () => void;
    configs: Configs;
    setConfigs: (configs: Configs) => void;
};

const DeleteButton = (props: Props) => {
    const { name, deleteNote, configs, setConfigs } = props;
    const { askOnDelete } = configs.general;

    const [open, setOpen] = useState(false);

    const setAskOnDelete = (b: boolean) => {
        console.log('Setting ask on delete to ', b);

        setConfigs({
            ...configs,
            general: {
                ...configs.general,
                askOnDelete: b
            }
        });
    };

    const handleDeleteButtonClicked = () => {
        if (!askOnDelete) {
            deleteNote();
            return;
        }

        setOpen(true);
    };

    return (
        <>
            <DeleteModal
                name={name}
                open={open}
                deleteNote={deleteNote}
                setOpen={(open: boolean) => {
                    setOpen(open);
                }}
                askOnDelete={askOnDelete}
                setAskOnDelete={setAskOnDelete}
            />
            <button
                className="bg-red-500 hover:bg-red-400"
                onClick={handleDeleteButtonClicked}
            >
                <TrashIcon className="mx-auto" />
            </button>
        </>
    );
};

export default DeleteButton;
