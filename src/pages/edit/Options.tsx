import { useNavigate } from 'react-router-dom';
import { ButtonBar } from '../../common/ButtonBar/ButtonBar';
import HomeIcon from '../../common/Icons/HomeIcon';
import MagnifyingGlassIcon from '../../common/Icons/MagnifyingGlassIcon';
import { Configs, Note } from '../../common/types';
import EditableText from '../../components/EditableText/EditableText';
import DeleteButton from './components/DeleteButton';
import PotentialRefs from './components/PotentialRefs';

type OptionsProps = {
    directory: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    edit: (newKeys: any) => void;
    deleteNote: () => void;
    note: Note;
    notes: Note[];
    configs: Configs;
    setConfigs: (configs: Configs) => void;
};

const Options = (props: OptionsProps) => {
    const { directory, edit, deleteNote, note, notes, configs, setConfigs } =
        props;

    const navigate = useNavigate();

    const gotoView = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).startViewTransition(() => navigate(`/${note.id}`));
    };

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
                            edit({ directory: val });
                        }}
                    />
                </span>
                <ButtonBar>
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        <HomeIcon className="mx-auto" />
                    </button>
                    <button onClick={gotoView}>
                        <MagnifyingGlassIcon className="w-6 mx-auto" />
                    </button>
                    <DeleteButton
                        deleteNote={deleteNote}
                        name={note.title}
                        askOnDelete={configs.general.askOnDelete}
                        setAskOnDelete={setAskOnDelete}
                    />
                </ButtonBar>
                <PotentialRefs notes={notes} note={note} edit={edit} />
            </div>
        </aside>
    );
};

export default Options;
