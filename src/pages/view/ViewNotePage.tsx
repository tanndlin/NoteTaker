import { useParams } from 'react-router-dom';
import { Configs, Note } from '../../common/types';
import TabContainer from '../../components/Tabs/TabContainer';
import './ViewNote.scss';
type ViewNoteProps = {
    notes: Note[];
    createNote: () => number;
    configs: Configs;
};

const ViewNotePage = (props: ViewNoteProps) => {
    const { notes, createNote, configs } = props;

    const { id } = useParams();
    const note = props.notes.find((note) => note.id === Number(id));
    if (!note) {
        return <h1>404</h1>;
    }

    document.title = note.title;

    return <TabContainer notes={notes} createNote={createNote} />;
};

export default ViewNotePage;
