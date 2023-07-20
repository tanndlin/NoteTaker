import { Configs, Note } from '../../../common/types';
import SettingsCategory from './SettingsCategory';
import ButtonConfig from './configs/ButtonConfig';

type Props = {
    notes: Note[];
    configs: Configs;
    setConfigs: (configs: Configs) => void;
    setNotes: (notes: Note[]) => void;
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

    const importFromJSON = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = (readerEvent) => {
                    const content = readerEvent.target?.result;
                    if (typeof content === 'string') {
                        try {
                            const importedNotes = JSON.parse(content);
                            if (Array.isArray(importedNotes)) {
                                props.setNotes(importedNotes);
                            } else {
                                throw new Error('Invalid JSON');
                            }
                        } catch (e) {
                            alert('Invalid JSON');
                        }
                    }
                };
            }
        };
        input.click();
    };

    return (
        <div className="settings-tab">
            <h1>Export</h1>
            <SettingsCategory title="Import/Export">
                <ButtonConfig
                    title="Export To JSON"
                    description="Export all notes as a JSON file."
                    name="Export"
                    onClick={exportToJSON}
                />
                <ButtonConfig
                    title="Import From JSON"
                    description="Import notes from a JSON file."
                    name="Import"
                    onClick={importFromJSON}
                />
            </SettingsCategory>
        </div>
    );
};

export default ExportSettings;
