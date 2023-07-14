import { ConfigProps } from '../../SettingsPage';

type Props = {
    name: string;
    onClick: () => void;
} & ConfigProps;

const ButtonConfig = (props: Props) => {
    const { title, description, name, onClick } = props;

    return (
        <div className="settings-config config-button">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={onClick}>{name}</button>
        </div>
    );
};

export default ButtonConfig;
