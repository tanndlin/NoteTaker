import { ConfigProps } from '../../SettingsPage';

type Props = {
    name: string;
    onClick: () => void;
    className?: string;
} & ConfigProps;

const ButtonConfig = (props: Props) => {
    const { title, description, name, onClick, className } = props;

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
