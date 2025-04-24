import React from 'react';
import { ConfigProps } from '../../SettingsPage';
import DictionaryConfigEntry from './DictionaryConfigEntry';

type Props = {
    value: { [key: string]: string };
    setValue: (newDictionary: { [key: string]: string }) => void;
} & ConfigProps;

const DictionaryConfig: React.FC<Props> = ({
    title,
    description,
    value,
    setValue
}) => {
    const [editingKey, setEditingKey] = React.useState<string | null>(null);

    const handleAddEntry = () => {
        const newKey = `key${Date.now()}`;
        setValue({ ...value, [newKey]: '' });
        setEditingKey(newKey);
    };

    const commitChangeToEntry = (
        oldKey: string,
        newKey: string,
        newValue: string
    ) => {
        const newDictionary = { ...value };
        delete newDictionary[oldKey];
        newDictionary[newKey] = newValue;

        setValue(newDictionary);
        setEditingKey(newKey);
    };

    const handleDeleteEntry = (key: string) => {
        const newDictionary = { ...value };
        delete newDictionary[key];
        setValue(newDictionary);
        if (editingKey === key) {
            setEditingKey(null);
        }
    };

    return (
        <div className="settings-config config-dictionary">
            <h3>{title}</h3>
            <p>{description}</p>
            <table className="dictionary-table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th colSpan={2}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(value).map(([key, val]) => (
                        <DictionaryConfigEntry
                            key={key}
                            name={key}
                            value={val}
                            commitChange={commitChangeToEntry}
                            deleteValue={handleDeleteEntry}
                            isEditing={editingKey === key}
                            setEditingKey={setEditingKey}
                        />
                    ))}
                </tbody>
            </table>
            <button className="mt-4" onClick={handleAddEntry}>
                Add Entry
            </button>
        </div>
    );
};

export default DictionaryConfig;
