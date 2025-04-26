import React, { useEffect } from 'react';
import './EditableText.scss';

type EditableTextProps = {
    id: string;
    value: string;
    type?: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const EditableText = (props: EditableTextProps) => {
    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        props.onBlur && props.onBlur(e);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(e);

        const span = document.getElementById(`fakeSpan${props.id}`)!;
        span.innerHTML = e.target.value.replace(/\s/g, '&nbsp;');
        e.target.style.width = span.offsetWidth + 'px';
    }

    useEffect(() => {
        const span = document.getElementById(`fakeSpan${props.id}`)!;
        span.innerHTML = `${props.value}`.replace(/\s/g, '&nbsp;');
        document.getElementById(props.id)!.style.width =
            span.offsetWidth + 10 + 'px';
    }, []);

    return (
        <div className={`editableContainer ${props.className}`}>
            <input
                id={props.id}
                onChange={onChange}
                onBlur={onBlur}
                className="editable"
                type={props.type}
                value={props.value}
            />
            <span
                id={`fakeSpan${props.id}`}
                className={`fakeSpan ${props.className}`}
            ></span>
        </div>
    );
};

export default EditableText;
