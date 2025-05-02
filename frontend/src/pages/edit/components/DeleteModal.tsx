import { useContext } from 'react';
import Close from '../../../components/Close/Close';
import { ConfigContext } from '../../../contexts/ConfigContext';

type Props = {
    name: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    deleteNote: () => void;
};

const DeleteModal = ({ name, open, setOpen, deleteNote }: Props) => {
    const { configs, setConfigs } = useContext(ConfigContext);
    const { askOnDelete } = configs.general;

    const setAskOnDelete = (b: boolean) => {
        setConfigs({
            ...configs,
            general: {
                ...configs.general,
                askOnDelete: b
            }
        });
    };

    return (
        <dialog
            className="text-white modal-overlay"
            open={open}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setOpen(false);
                }
            }}
        >
            <div className="modal bg-secondary p-3 rounded-md min-w-[500px]">
                <header className="relative">
                    <Close
                        className="visible"
                        callback={() => setOpen(false)}
                    />
                    <h1 className="py-2 text-xl font-bold">Delete Note</h1>
                </header>
                <p>Are you sure you want to delete {`"${name}"`}?</p>
                <footer className="flex flex-row mt-8">
                    <div className="flex flex-row w-1/2">
                        <input
                            type="checkbox"
                            id="askOnDelete"
                            className="my-auto mr-2"
                            checked={!askOnDelete}
                            onChange={(e) => setAskOnDelete(!e.target.checked)}
                        />
                        <label htmlFor="askOnDelete" className="my-auto">
                            {"Don't ask again"}
                        </label>
                    </div>
                    <div className="flex flex-row justify-end w-1/2 gap-4 ml-auto">
                        <button
                            className="hover:bg-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button className="bg-bad" onClick={deleteNote}>
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </dialog>
    );
};

export default DeleteModal;
