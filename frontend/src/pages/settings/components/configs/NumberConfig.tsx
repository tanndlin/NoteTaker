import React from 'react';
import { ConfigProps } from '../../SettingsPage';

type Props = {
    value: number;
    setValue: (b: number) => void;
} & ConfigProps;

const NumberConfig: React.FC<Props> = ({
    title,
    description,
    value,
    setValue
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        if (!isNaN(newValue)) {
            setValue(newValue);
        }
    };

    return (
        <div className="settings-config config-number">
            <h3>{title}</h3>
            <p>{description}</p>
            <input type="number" value={value} onChange={handleChange} />
        </div>
    );
};

export default NumberConfig;
