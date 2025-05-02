import { FC } from 'react';
import { ConfigProps } from '../../SettingsPage';

type Props = {
    value: boolean;
    setValue: (b: boolean) => void;
} & ConfigProps;

const ToggleConfig: FC<Props> = ({ value, setValue, title, description }) => {
    return (
        <div className="settings-config config-toggle">
            <h3>{title}</h3>
            <span className="flex gap-4">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setValue(e.target.checked)}
                />
                <p>{description}</p>
            </span>
        </div>
    );
};

export default ToggleConfig;
