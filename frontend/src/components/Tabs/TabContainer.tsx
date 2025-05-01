import React, { useContext } from 'react';
import FolderViewWrapper from '../../common/FolderView/FolderViewWrapper';
import ViewOptions from '../../pages/view/ViewOptions';
import Tab from './Tab';
import TabHeader from './TabHeader';

import { StoredNote } from '../../common/types';
import { NoteContext } from '../../contexts/NoteContext';
import './Tab.scss';

const TabContainer = () => {
    const { notes, createNote } = useContext(NoteContext);

    const id = window.location.pathname.split('/')[1];
    const [tabbedNotes, setTabbedNotes] = React.useState<StoredNote[]>([
        notes.find((note) => note.id === parseInt(id))!
    ]);

    const [activeTab, setActiveTab] = React.useState(0);
    const note = tabbedNotes[activeTab];

    const closeTab = (tab: StoredNote) => {
        if (tabbedNotes.length === 1) {
            window.location.href = '/';
        }

        const newTabbedNotes = tabbedNotes.filter((t) => t.id !== tab.id);
        setTabbedNotes(newTabbedNotes);

        if (tabbedNotes.indexOf(tab) < activeTab) {
            setActiveTab(activeTab - 1);
        }

        if (tab.id === tabbedNotes[activeTab].id) {
            setActiveTab(0);
        }
    };

    const openTab = (note: StoredNote) => {
        if (!tabbedNotes.includes(note)) {
            setTabbedNotes([...tabbedNotes, note]);
            setActiveTab(tabbedNotes.length);
        } else {
            setActiveTab(tabbedNotes.indexOf(note));
        }
    };

    return (
        <div id="tabsContainer">
            <header className="grid w-screen grid-cols-3 px-8 TriplePane">
                <p />
                <h1 className="mx-8 mb-8 text-3xl page-title">{note.title}</h1>
                <p />
            </header>
            <div className="grid w-screen grid-cols-3 px-8 TriplePane">
                <p />
                <div className="mx-4 tabBar">
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
            <main className="grid h-full grid-cols-3 gap-8 pb-8 mx-8 TriplePane">
                <FolderViewWrapper
                    {...{
                        notes,
                        createNote,
                        className: 'viewPageFolderView folder-view',
                        onClick: openTab
                    }}
                />
                <article className="activeTabContainer overflow-auto min-h-[calc(100%-48px-62px)] h-full">
                    {tabbedNotes.map((tab, index) => (
                        <Tab
                            key={index}
                            tab={tab}
                            active={index === activeTab}
                            onClick={(id: number) => {
                                const note = notes.find(
                                    (note) => note.id === id
                                );

                                if (note) {
                                    openTab(note);
                                }
                            }}
                        />
                    ))}
                </article>
                <ViewOptions note={note} />
            </main>
        </div>
    );
};

export default TabContainer;
