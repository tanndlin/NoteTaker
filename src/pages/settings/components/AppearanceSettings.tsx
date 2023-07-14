import { Note } from '../../../common/types';

type Props = {
    notes: Note[];
};

const AppearanceSettings = (props: Props) => {
    return <div className="settings-tab">AppearanceSettings</div>;
};

export default AppearanceSettings;
