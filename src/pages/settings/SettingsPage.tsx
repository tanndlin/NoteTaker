import { useState } from 'react';
import AnimatedLink from '../../common/AnimatedLink';
import HomeIcon from '../../common/Icons/HomeIcon';
import TabbedContainer from '../../common/TabbedContainer';
import { Configs, Note } from '../../common/types';
import { smoothTransition } from '../../common/utils';
import AppearanceSettings from './components/AppearanceSettings';
import ExportSettings from './components/ExportSettings';
import GeneralSettings from './components/GeneralSettings';
import './settings.scss';

type Props = {
    configs: Configs;
    setConfigs: (configs: Configs) => void;
    notes: Note[];
    setNotes: (notes: Note[]) => void;
};

export type ConfigProps = {
    title: string;
    description: string;
};

const SettingsPage = (props: Props) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="settings-page">
            <TabbedContainer
                className="px-16"
                activeTab={activeTab}
                setActiveTab={(n) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    smoothTransition(() => setActiveTab(n));
                }}
            >
                <h1>General</h1>
                <h1>Appearance</h1>
                <h1>Export</h1>
            </TabbedContainer>
            <div className="settings-page-container">
                <p></p>
                {activeTab === 0 && <GeneralSettings {...props} />}
                {activeTab === 1 && <AppearanceSettings {...props} />}
                {activeTab === 2 && <ExportSettings {...props} />}
                <button className="w-20 h-10 mx-auto">
                    <AnimatedLink to="/">
                        <HomeIcon className="mx-auto text-white" />
                    </AnimatedLink>
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
