import React, { useContext } from 'react';
import { Note, StoredNote } from '../../../common/types';
import { NoteContext } from '../../../contexts/NoteContext';

type PotentialRefsProps = {
    note: StoredNote;
};

const PotentialRefs = ({ note }: PotentialRefsProps) => {
    const [potentialRefs, setPotentialRefs] = React.useState<Note[]>([]);
    const { notes, editNote } = useContext(NoteContext);

    React.useEffect(() => {
        setPotentialRefs(getPotentialRefs());
    }, [note]);

    const getPotentialRefs = (): Note[] => {
        try {
            return notes
                .filter((n) => n.id !== note.id)
                .reduce((acc: Note[], n: Note) => {
                    // eslint-disable-next-line no-useless-escape
                    const regex = new RegExp(
                        `(?<!(\\[|/))${n.title}(?!(\\]|/))`,
                        'gi'
                    );
                    if (note.body.match(regex)) {
                        acc.push(n);
                    }

                    return acc;
                }, []);
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    const assignRef = (ref: Note) => () => {
        // eslint-disable-next-line no-useless-escape
        const regex = new RegExp(`(?<!(\\[|/))${ref.title}(?!(\\]|/))`, 'gi');
        const newBody = note.body.replace(
            regex,
            `[${ref.title}](ref(${ref.directory}/${ref.title.replace(
                / /g,
                '_'
            )}))`
        );

        editNote({ ...note, body: newBody });
    };

    if (!potentialRefs.length) {
        return <></>;
    }

    return (
        <div className="p-4 rounded-md bg-secondary">
            <h1 className="text-xl text-center border-b-2">Potential Refs</h1>
            <ul>
                {potentialRefs.map((ref) => (
                    <li key={ref.id}>
                        <a className="cursor-pointer" onClick={assignRef(ref)}>
                            {ref.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PotentialRefs;
