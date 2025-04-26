import React from 'react';

type Props = {
    children: React.ReactNode[];
    className?: string;
    activeTab: number;
    setActiveTab: (index: number) => void;
};

const TabbedContainer = (props: Props) => {
    const { children, activeTab, setActiveTab } = props;

    return (
        <ul className={'tab-container ' + (props.className ?? '')}>
            {children.map((child, index) => {
                const className =
                    'tab' + (activeTab === index ? ' active-tab' : '');

                return (
                    <li
                        key={index}
                        className={className}
                        onClick={() => {
                            setActiveTab(index);
                        }}
                    >
                        {child}
                    </li>
                );
            })}
        </ul>
    );
};

export default TabbedContainer;
