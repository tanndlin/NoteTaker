import { useContext } from 'react';
import { ConfigContext } from '../../../contexts/ConfigContext';
import SettingsCategory from './SettingsCategory';
import NumberConfig from './configs/NumberConfig';

const AppearanceSettings = () => {
    const { configs, setConfigs } = useContext(ConfigContext);

    const setPreviewDelay = (value: number) => {
        setConfigs({
            ...configs,
            appearance: {
                ...configs.appearance,
                previewDelay: value
            }
        });
    };

    return (
        <div className="settings-tab">
            <h1>Appearance</h1>
            <SettingsCategory title="Preview Settings">
                <NumberConfig
                    title="Preview Delay (ms)"
                    description="Delay before showing the preview when hovering over a note reference."
                    value={configs.appearance.previewDelay}
                    setValue={setPreviewDelay}
                />
            </SettingsCategory>
        </div>
    );
};

export default AppearanceSettings;
