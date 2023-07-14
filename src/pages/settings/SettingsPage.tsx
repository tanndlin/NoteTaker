import { useState } from 'react';
import TabbedContainer from '../../common/TabbedContainer';
import { Note } from '../../common/types';
import AppearanceSettings from './components/AppearanceSettings';
import ExportSettings from './components/ExportSettings';
import GeneralSettings from './components/GeneralSettings';
import './settings.scss';

type Props = {
    notes: Note[];
};

const SettingsPage = (props: Props) => {
    const { notes } = props;

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="settings-page">
            <TabbedContainer
                activeTab={activeTab}
                setActiveTab={(n) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (document as any).startViewTransition(() =>
                        setActiveTab(n)
                    );
                }}
            >
                <h1>General</h1>
                <h1>Appearance</h1>
                <h1>Export</h1>
            </TabbedContainer>
            {activeTab === 0 && <GeneralSettings notes={notes} />}
            {activeTab === 1 && <AppearanceSettings notes={notes} />}
            {activeTab === 2 && <ExportSettings notes={notes} />}
        </div>
    );
};

export default SettingsPage;
