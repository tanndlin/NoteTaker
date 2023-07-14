import { Note } from '../../../common/types';
import Config from './Config';
import SettingsCategory from './SettingsCategory';

type Props = {
    notes: Note[];
};

const ExportSettings = (props: Props) => {
    const { notes } = props;

    const exportToJSON = () => {
        const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(notes));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'notes.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="settings-tab">
            <h1>Export</h1>
            <SettingsCategory title="Export Notes">
                <Config
                    title="Export To JSON"
                    description="Export all notes as a JSON file."
                    button={{ name: 'Export', onClick: exportToJSON }}
                />
            </SettingsCategory>
        </div>
    );
};

export default ExportSettings;
