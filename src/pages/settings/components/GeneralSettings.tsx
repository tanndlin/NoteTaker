import { useContext } from 'react';
import { ConfigContext } from '../../../contexts/ConfigContext';
import SettingsCategory from './SettingsCategory';
import ToggleConfig from './configs/ToggleConfig';

const GeneralSettings = () => {
    const { configs, setConfigs } = useContext(ConfigContext);

    const setAskOnDelete = (b: boolean) => {
        setConfigs({
            ...configs,
            general: {
                ...configs.general,
                askOnDelete: b
            }
        });
    };

    const setCreateUnfilledNote = (b: boolean) => {
        setConfigs({
            ...configs,
            general: {
                ...configs.general,
                createUnfilledNote: b
            }
        });
    };

    return (
        <div className="settings-tab">
            <h1>General</h1>
            <SettingsCategory title="Note Editor">
                <ToggleConfig
                    title="Ask on delete"
                    description="Whether or not to confirm deletion of notes."
                    value={configs.general.askOnDelete}
                    setValue={setAskOnDelete}
                />
            </SettingsCategory>
            <SettingsCategory title="Graph">
                <ToggleConfig
                    title="Create unfilled note"
                    description="Click on an unfilled (gray) note to create a new note."
                    value={configs.general.createUnfilledNote}
                    setValue={setCreateUnfilledNote}
                />
            </SettingsCategory>
        </div>
    );
};

export default GeneralSettings;
