import React from 'react';
import { Note } from '../../../common/types';

type PotentialRefsProps = {
    note: Note;
    notes: Note[];
    edit: (newKeys: any) => void;
};

const PotentialRefs = (props: PotentialRefsProps) => {
    const { note, notes } = props;
    const [potentialRefs, setPotentialRefs] = React.useState<Note[]>([]);

    React.useEffect(() => {
        setPotentialRefs(getPotentialRefs());
    }, [props.note]);

    const getPotentialRefs = (): Note[] => {
        return notes
            .filter((n) => n.id !== note.id)
            .reduce((acc: Note[], n: Note) => {
                // eslint-disable-next-line no-useless-escape
                const regex = new RegExp(
                    `(?<!(\\[|/))${n.title.split('').join('\\')}(?!(\\]|/))`,
                    'gi'
                );
                if (note.body.match(regex)) {
                    acc.push(n);
                }

                return acc;
            }, []);
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

        props.edit({ body: newBody });
        console.log(newBody);
    };

    if (!potentialRefs.length) return <></>;

    return (
        <div className="p-4 bg-secondary rounded-md">
            <h1 className="text-center text-xl border-b-2">Potential Refs</h1>
            <ul>
                {potentialRefs.map((ref) => (
                    <li key={ref.id}>
                        <a onClick={assignRef(ref)}>{ref.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PotentialRefs;
