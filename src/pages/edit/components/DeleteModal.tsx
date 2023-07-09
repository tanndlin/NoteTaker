import Close from '../../../components/Close/Close';

type Props = {
    name: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    deleteNote: () => void;
    dontAsk: boolean;
    setDontAsk: (dontAsk: boolean) => void;
};

const DeleteModal = (props: Props) => {
    const { name, open, setOpen, deleteNote, dontAsk, setDontAsk } = props;

    return (
        <dialog
            className="modal-overlay text-white"
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
                    <h1 className="text-xl font-bold py-2">Delete Note</h1>
                </header>
                <p>Are you sure you want to delete {`"${name}"`}?</p>
                <footer className="mt-8 flex flex-row">
                    <div className="w-1/2 flex flex-row">
                        <input
                            type="checkbox"
                            id="dontAsk"
                            className="mr-2 my-auto"
                            checked={dontAsk}
                            onChange={(e) => setDontAsk(e.target.checked)}
                        />
                        <label htmlFor="dontAsk" className="my-auto">
                            {"Don't ask again"}
                        </label>
                    </div>
                    <div className="w-1/2 ml-auto flex flex-row gap-4 justify-end">
                        <button
                            className="hover:bg-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-400"
                            onClick={deleteNote}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </dialog>
    );
};

export default DeleteModal;
