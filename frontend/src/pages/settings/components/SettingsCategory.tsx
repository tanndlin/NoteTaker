import React, { FC } from 'react';

type Props = {
    title: string;
    children: React.ReactNode | React.ReactNode[];
};

const SettingsCategory: FC<Props> = ({ title, children }) => {
    return (
        <div className="settings-category">
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default SettingsCategory;
