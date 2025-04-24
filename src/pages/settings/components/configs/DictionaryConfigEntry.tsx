import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react';

type Props = {
    name: string;
    value: string;
    commitChange: (oldKey: string, newKey: string, value: string) => void;
    deleteValue: (key: string) => void;
    isEditing: boolean;
    setEditingKey: (key: string | null) => void;
};

const DictionaryConfigEntry: React.FC<Props> = ({
    name,
    value,
    commitChange,
    deleteValue,
    isEditing,
    setEditingKey
}) => {
    const [localName, setLocalName] = React.useState(name);
    const [localValue, setLocalValue] = React.useState(value);
    const rowRef = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        if (isEditing) {
            setLocalName(name);
            setLocalValue(value);
        }
    }, [isEditing, name, value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                rowRef.current &&
                !rowRef.current.contains(event.target as Node) &&
                isEditing
            ) {
                // Apply any changes before closing the editor
                commitChange(name, localName, localValue);
                setEditingKey(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, setEditingKey, localName, localValue]);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setEditingKey(null);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [setEditingKey]);

    return (
        <tr ref={rowRef} tabIndex={-1}>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={localName}
                        onInput={(e) =>
                            setLocalName((e.target as HTMLInputElement).value)
                        }
                        onBlur={() => {
                            commitChange(name, localName, localValue);
                            setEditingKey(null);
                        }}
                        className="w-full"
                    />
                ) : (
                    <span>{name}</span>
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        onBlur={() => {
                            commitChange(name, localName, localValue);
                            setEditingKey(null);
                        }}
                        className="w-full"
                    />
                ) : (
                    <span>{value}</span>
                )}
            </td>
            <td className="flex buttons">
                <div className="ml-auto">
                    <button
                        className="!bg-transparent h-full w-9"
                        onClick={() => setEditingKey(name)}
                    >
                        <PencilIcon className="mx-auto" />
                    </button>
                    <button
                        className="!bg-transparent h-full w-9"
                        onClick={() => deleteValue(name)}
                    >
                        <TrashIcon className="mx-auto" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default DictionaryConfigEntry;
