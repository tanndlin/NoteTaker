import React from 'react';
import Tab from './Tab';
import TabHeader from './TabHeader';
import { Note } from '../../common/types';
import ViewOptions from '../../pages/view/ViewOptions';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';

import './Tab.scss';

type TabContainerProps = {
    notes: Note[];
    createNote: () => number;
};

const TabContainer = (props: TabContainerProps) => {
    const { notes, createNote } = props;

    const [activeTab, setActiveTab] = React.useState(0);
    const [tabbedNotes, setTabbedNotes] = React.useState<Note[]>([
        notes[activeTab]
    ]);

    const note = tabbedNotes[activeTab];

    const closeTab = (tab: Note) => {
        if (tabbedNotes.length === 1) window.location.href = '/';

        const newTabbedNotes = tabbedNotes.filter((t) => t.id !== tab.id);
        setTabbedNotes(newTabbedNotes);

        if (tabbedNotes.indexOf(tab) < activeTab) setActiveTab(activeTab - 1);

        if (tab.id === tabbedNotes[activeTab].id) {
            setActiveTab(0);
        }
    };

    return (
        <div id="tabsContainer">
            <header className="grid grid-cols-3 w-screen TriplePane px-8">
                <p />
                <h1 className="text-3xl mx-8 mb-8">{note.title}</h1>
                <p />
            </header>
            <div className="grid grid-cols-3 w-screen TriplePane px-8">
                <p />
                <div className="tabBar mx-4">
                    {tabbedNotes.map((tab, index) => (
                        <TabHeader
                            key={index}
                            tab={tab}
                            active={index === activeTab}
                            onClick={() => setActiveTab(index)}
                            closeTab={closeTab}
                        />
                    ))}
                </div>
                <p />
            </div>
            <main className="grid grid-cols-3 gap-8 TriplePane mx-8 pb-8 h-full">
                <FolderViewWrapper
                    {...{
                        notes,
                        createNote,
                        className: 'viewPageFolderView',
                        onClick: (id: number) => {
                            const note = notes.find((note) => note.id === id);
                            if (!note) return;

                            if (!tabbedNotes.includes(note)) {
                                setTabbedNotes([...tabbedNotes, note]);
                                setActiveTab(tabbedNotes.length);
                            } else {
                                setActiveTab(tabbedNotes.indexOf(note));
                            }
                        }
                    }}
                />
                <article className="activeTabContainer overflow-auto min-h-[calc(100%-48px-62px)] h-full">
                    {tabbedNotes.map((tab, index) => (
                        <Tab
                            key={index}
                            tab={tab}
                            notes={notes}
                            active={index === activeTab}
                        />
                    ))}
                </article>
                <ViewOptions directory={note.directory} />
            </main>
        </div>
    );
};

export default TabContainer;
