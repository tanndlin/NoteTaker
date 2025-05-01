import { CreateNoteHeaders, CreateNoteResponse } from '@backend/types';
import { useContext } from 'react';
import { apiFetch } from '../../../common/fetch';
import { Note } from '../../../common/types';
import { AuthContext } from '../../../contexts/AuthContext';
import { ConfigContext } from '../../../contexts/ConfigContext';
import { NoteContext } from '../../../contexts/NoteContext';
import SettingsCategory from './SettingsCategory';
import ButtonConfig from './configs/ButtonConfig';
import ToggleConfig from './configs/ToggleConfig';

const ExportSettings = () => {
    const { notes, setNotes } = useContext(NoteContext);
    const { configs, setConfigs } = useContext(ConfigContext);
    const { token } = useContext(AuthContext);
    const { fetchData } = apiFetch<CreateNoteResponse, CreateNoteHeaders>({
        method: 'POST',
        endpoint: 'notes/create',
        token
    });

    const exportToJSON = () => {
        const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(notes));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'notes.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    // Dont add notes that already exist
    const setNotesWithoutReplace = (newNotes: Note[]) => {
        if (configs.export.resolveConflictsReplace) {
            const oldNotes = notes.filter(
                (note) => !newNotes.some((newNote) => newNote.id === note.id)
            );
            setNotes([...oldNotes, ...newNotes]);
        } else {
            const filteredNotes = newNotes.filter(
                (newNote) => !notes.some((note) => note.id === newNote.id)
            );
            setNotes([...notes, ...filteredNotes]);
        }
    };

    const importFromJSON = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = async (readerEvent) => {
                const content = readerEvent.target?.result;
                if (typeof content !== 'string') {
                    return;
                }

                try {
                    const importedNotes = JSON.parse(content);
                    if (!Array.isArray(importedNotes)) {
                        throw new Error('Invalid JSON');
                    }

                    if (configs.export.replaceOnImport) {
                        setNotes(importedNotes);
                        importedNotes.forEach(async (note) => {
                            await fetchData({
                                title: note.title,
                                body: note.body,
                                directory: note.directory,
                                id: note.id
                            });
                        });
                    } else {
                        setNotesWithoutReplace(importedNotes);
                    }
                } catch (e) {
                    alert('Invalid JSON');
                }
            };
        };
        input.click();
    };

    const setExportConfigs = (key: string, b: boolean) => {
        setConfigs({
            ...configs,
            export: {
                ...configs.export,
                [key]: b
            }
        });
    };

    const setReplaceOnImport = (b: boolean) => {
        setExportConfigs('replaceOnImport', b);
    };

    const setResolveConflictsReplace = (b: boolean) => {
        setExportConfigs('resolveConflictsReplace', b);
    };

    return (
        <div className="settings-tab">
            <h1>Export</h1>
            <SettingsCategory title="Import/Export">
                <ButtonConfig
                    title="Export To JSON"
                    description="Export all notes as a JSON file."
                    name="Export"
                    onClick={exportToJSON}
                />
                <ButtonConfig
                    title="Import From JSON"
                    description="Import notes from a JSON file."
                    name="Import"
                    onClick={importFromJSON}
                />
                <ToggleConfig
                    title="Replace Notes"
                    description="Replace all notes with the imported notes."
                    value={configs.export.replaceOnImport}
                    setValue={setReplaceOnImport}
                />
                <ToggleConfig
                    title="Resolve Conflicts"
                    description="Strategy for resolving conflicting IDs when 'Replace Notes' is off. True: Old notes have priority. False: New notes have priority."
                    value={configs.export.resolveConflictsReplace}
                    setValue={setResolveConflictsReplace}
                />
            </SettingsCategory>
        </div>
    );
};

export default ExportSettings;
