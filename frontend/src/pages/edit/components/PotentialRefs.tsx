import React, { useContext } from 'react';
import { StoredNote } from '../../../common/types';
import { NoteContext } from '../../../contexts/NoteContext';

type PotentialRefsProps = {
    note: StoredNote;
};

const PotentialRefs = ({ note }: PotentialRefsProps) => {
    const [potentialRefs, setPotentialRefs] = React.useState<StoredNote[]>([]);
    const { notes, editNote } = useContext(NoteContext);

    React.useEffect(() => {
        setPotentialRefs(getPotentialRefs());
    }, [note]);

    const getPotentialRefs = (): StoredNote[] => {
        try {
            return notes
                .filter((n) => n.id !== note.id)
                .reduce((acc: StoredNote[], n: StoredNote) => {
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
            console.error(e);
            return [];
        }
    };

    const assignRef = (ref: StoredNote) => () => {
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
