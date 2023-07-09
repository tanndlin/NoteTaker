import { useEffect, useState } from 'react';
import TrashIcon from '../../../common/Icons/TrashIcon';
import DeleteModal from './DeleteModal';

type Props = {
    name: string;
    deleteNote: () => void;
};

const DeleteButton = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [dontAsk, setDontAsk] = useState(
        localStorage.getItem('dontAskDelete') === 'true'
    );

    const handleDeleteButtonClicked = () => {
        if (dontAsk) {
            props.deleteNote();
            return;
        }

        setOpen(true);
    };

    useEffect(() => {
        localStorage.setItem('dontAskDelete', dontAsk.toString());
    }, [dontAsk]);

    return (
        <>
            <DeleteModal
                name={props.name}
                open={open}
                deleteNote={props.deleteNote}
                setOpen={(open: boolean) => {
                    setOpen(open);
                }}
                dontAsk={dontAsk}
                setDontAsk={(dontAsk: boolean) => setDontAsk(dontAsk)}
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
