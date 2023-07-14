import { Configs, Note } from '../../../common/types';
import SettingsCategory from './SettingsCategory';
import ToggleConfig from './configs/ToggleConfig';

type Props = {
    notes: Note[];
    configs: Configs;
    setConfigs: (configs: Configs) => void;
};

const GeneralSettings = (props: Props) => {
    const { configs, setConfigs } = props;

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
        </div>
    );
};

export default GeneralSettings;
