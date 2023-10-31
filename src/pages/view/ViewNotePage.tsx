import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import TabContainer from '../../components/Tabs/TabContainer';
import { NoteContext } from '../../contexts/NoteContext';
import './ViewNote.scss';

const ViewNotePage = () => {
    const { notes } = useContext(NoteContext);

    const { id } = useParams();
    const note = notes.find((note) => note.id === Number(id));
    if (!note) {
        return <h1>404</h1>;
    }

    document.title = note.title;

    return <TabContainer />;
};

export default ViewNotePage;
