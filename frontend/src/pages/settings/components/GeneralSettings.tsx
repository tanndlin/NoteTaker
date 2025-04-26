import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { ConfigContext } from '../../../contexts/ConfigContext';
import SettingsCategory from './SettingsCategory';
import ButtonConfig from './configs/ButtonConfig';
import DictionaryConfig from './configs/DictionaryConfig';
import ToggleConfig from './configs/ToggleConfig';

const GeneralSettings = () => {
    const { configs, setConfigs } = useContext(ConfigContext);
    const { signOut } = useContext(AuthContext);

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

    const setShorthands = (newShorthands: Record<string, string>) => {
        setConfigs({
            ...configs,
            general: {
                ...configs.general,
                shorthands: newShorthands
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
                <DictionaryConfig
                    title="Shorthand Replacements"
                    description="Define shorthand macros that will be expanded when viewing notes."
                    value={configs.general.shorthands}
                    setValue={setShorthands}
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
            <SettingsCategory title="Account">
                <ButtonConfig
                    title="Sign out"
                    name="Sign out"
                    description="Sign out of your account."
                    onClick={signOut!}
                />
            </SettingsCategory>
        </div>
    );
};

export default GeneralSettings;
