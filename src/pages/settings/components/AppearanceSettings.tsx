import { Configs, Note } from '../../../common/types';

type Props = {
    notes: Note[];
    configs: Configs;
    setConfigs: (configs: Configs) => void;
};

const AppearanceSettings = (props: Props) => {
    const { configs, setConfigs } = props;

    return <div className="settings-tab">AppearanceSettings</div>;
};

export default AppearanceSettings;
