import { useNavigate } from 'react-router-dom';
import { ButtonBar } from '../../common/ButtonBar/ButtonBar';
import EditIcon from '../../common/Icons/EditIcon';
import HomeIcon from '../../common/Icons/HomeIcon';
import { Note } from '../../common/types';

type PreviewOptionsProps = {
    note: Note;
};

const ViewOptions = (props: PreviewOptionsProps) => {
    const { directory, id } = props.note;
    const navigate = useNavigate();

    const goto = (path: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).startViewTransition(() => navigate(path));
    };

    return (
        <aside className="mt-16">
            <h2 className="mb-8 text-2xl text-center">Options</h2>
            <div className="flex flex-col gap-8">
                <span className="flex flex-col">
                    <label htmlFor="directory">Directory</label>
                    <h2>{directory}</h2>
                </span>
                <ButtonBar>
                    <button onClick={() => goto('/')}>
                        <HomeIcon className="mx-auto" />
                    </button>
                    <button onClick={() => goto(`/${id}/edit`)}>
                        <EditIcon className="mx-auto" />
                    </button>
                </ButtonBar>
            </div>
        </aside>
    );
};

export default ViewOptions;
