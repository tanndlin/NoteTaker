import { useState } from 'react';
import TrashIcon from '../../../common/Icons/TrashIcon';
import DeleteModal from './DeleteModal';

type Props = {
    name: string;
    deleteNote: () => void;
    askOnDelete: boolean;
    setAskOnDelete: (b: boolean) => void;
};

const DeleteButton = (props: Props) => {
    const { name, deleteNote, askOnDelete, setAskOnDelete } = props;
    const [open, setOpen] = useState(false);

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
            <button className="bg-bad" onClick={handleDeleteButtonClicked}>
                <TrashIcon className="mx-auto" />
            </button>
        </>
    );
};

export default DeleteButton;
