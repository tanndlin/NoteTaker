import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBar } from '../../common/ButtonBar/ButtonBar';
import HomeIcon from '../../common/Icons/HomeIcon';
import MagnifyingGlassIcon from '../../common/Icons/MagnifyingGlassIcon';
import { StoredNote } from '../../common/types';
import { smoothTransition } from '../../common/utils';
import EditableText from '../../components/EditableText/EditableText';
import { NoteContext } from '../../contexts/NoteContext';
import DeleteButton from './components/DeleteButton';
import PotentialRefs from './components/PotentialRefs';

type OptionsProps = {
    directory: string;
    note: StoredNote;
};

const Options = ({ directory, note }: OptionsProps) => {
    const { editNote } = useContext(NoteContext);
    const navigate = useNavigate();

    return (
        <aside className="mx-8 mt-16">
            <h2 className="mb-8 text-2xl text-center">Options</h2>
            <div className="flex flex-col gap-8">
                <span className="flex flex-col">
                    <label htmlFor="directory">Directory</label>
                    <EditableText
                        id="directory"
                        value={directory}
                        onChange={(e) => {
                            let val = e.target.value;
                            if (!val.startsWith('/')) {
                                val = '/' + val;
                            }
                            editNote({ ...note, directory: val });
                        }}
                    />
                </span>
                <ButtonBar>
                    <button
                        onClick={() => smoothTransition(() => navigate('/'))}
                    >
                        <HomeIcon className="mx-auto" />
                    </button>
                    <button
                        onClick={() =>
                            smoothTransition(() => navigate(`/${note.id}`))
                        }
                    >
                        <MagnifyingGlassIcon className="w-6 mx-auto" />
                    </button>
                    <DeleteButton name={note.title} note={note} />
                </ButtonBar>
                <PotentialRefs note={note} />
            </div>
        </aside>
    );
};

export default Options;
