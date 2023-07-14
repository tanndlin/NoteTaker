type Props = {
    title: string;
    description: string;
    button?: { name: string; onClick: () => void };
};

const Config = (props: Props) => {
    const { title, description, button } = props;

    return (
        <div className="settings-config">
            <h3>{title}</h3>
            <p>{description}</p>
            {button && <button onClick={button.onClick}>{button.name}</button>}
        </div>
    );
};

export default Config;
