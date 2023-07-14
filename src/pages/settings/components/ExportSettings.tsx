import { Configs, Note } from '../../../common/types';
import SettingsCategory from './SettingsCategory';
import ButtonConfig from './configs/ButtonConfig';

type Props = {
    notes: Note[];
    configs: Configs;
    setConfigs: (configs: Configs) => void;
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
                <ButtonConfig
                    title="Export To JSON"
                    description="Export all notes as a JSON file."
                    name="Export"
                    onClick={exportToJSON}
                />
            </SettingsCategory>
        </div>
    );
};

export default ExportSettings;
