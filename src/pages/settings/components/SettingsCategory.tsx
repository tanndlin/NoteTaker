import React from 'react';

type Props = {
    title: string;
    children: React.ReactNode | React.ReactNode[];
};

const SettingsCategory = (props: Props) => {
    const { title, children } = props;

    return (
        <div className="settings-category">
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default SettingsCategory;
