import { FC } from 'react';
import { ConfigProps } from '../../SettingsPage';

type Props = {
    name: string;
    onClick: () => void;
    className?: string;
} & ConfigProps;

const ButtonConfig: FC<Props> = ({
    name,
    onClick,
    className,
    title,
    description
}) => {
    return (
        <div className="settings-config config-button">
            <h3>{title}</h3>
            <p>{description}</p>
            <button className={className ?? ''} onClick={onClick}>
                {name}
            </button>
        </div>
    );
};

export default ButtonConfig;
