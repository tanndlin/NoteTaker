type CloseProps = {
    className?: string;
    callback: (e: unknown) => void;
};

const Close = (props: CloseProps) => {
    const className = 'close ' + props.className ?? '';

    return (
        <input
            className={className}
            type="button"
            value="&times;"
            onClick={props.callback}
        />
    );
};

export default Close;
