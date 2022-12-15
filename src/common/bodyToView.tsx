import { Note } from './types';

export const createLinks = (note: Note, notes: Note[]) => {
    const regex = /\]\(ref\((.+)\)\)/g;
    const matches = note.body.matchAll(regex);
    const refs = Array.from(matches).map((match) =>
        match[1].replace(/_/g, ' ')
    );

    const findNoteFromRef = (ref: string) => {
        return notes.find((note) => `${note.directory}/${note.title}` === ref);
    };

    const currentDepth = (note.directory.match(/\//g) || []).length;
    let newBody = note.body;
    refs.forEach((ref) => {
        const note = findNoteFromRef(ref);
        if (!note) {
            return;
        }

        newBody = newBody.replace(
            `ref(${ref.replace(/ /g, '_')})`,
            `${'../'.repeat(currentDepth)}${note.id}`
        );
    });

    return newBody;
};
