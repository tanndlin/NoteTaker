import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../../common/Icons/TrashIcon';
import { StoredNote } from '../../../common/types';
import { ConfigContext } from '../../../contexts/ConfigContext';
import { NoteContext } from '../../../contexts/NoteContext';
import DeleteModal from './DeleteModal';

type Props = {
    note: StoredNote;
    name: string;
};

const DeleteButton = ({ name, note }: Props) => {
    const [open, setOpen] = useState(false);
    const { deleteNote } = useContext(NoteContext);
    const { configs } = useContext(ConfigContext);
    const { askOnDelete } = configs.general;
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteNote(note);
        navigate('/');
    };

    const handleDeleteButtonClicked = () => {
        if (!askOnDelete) {
            handleDelete();
            return;
        }

        setOpen(true);
    };

    return (
        <>
            <DeleteModal
                name={name}
                open={open}
                deleteNote={handleDelete}
                setOpen={(open: boolean) => {
                    setOpen(open);
                }}
            />
            <button className="bg-bad" onClick={handleDeleteButtonClicked}>
                <TrashIcon className="mx-auto" />
            </button>
        </>
    );
};

export default DeleteButton;
