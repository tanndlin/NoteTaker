import React from 'react';

type CloseProps = {
    callback: (e: any) => void;
};

const Close = (props: CloseProps) => {
    return (
        <input
            className="close"
            type="button"
            value="&times;"
            onClick={props.callback}
        />
    );
};

export default Close;
