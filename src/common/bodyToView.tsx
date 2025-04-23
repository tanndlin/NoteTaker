import { Note } from './types';

export const createLinks = (note: Note, notes: Note[]) => {
    const currentDepth = (note.directory.match(/\//g) || []).length;
    let newBody = note.body + '';
    const refs = getNonNullRefs(note, notes);

    refs.forEach((ref) => {
        newBody = newBody.replace(
            `ref(${ref.ref.replace(/ /g, '_')})`,
            `${'../'.repeat(currentDepth)}${ref.note.id}/edit`
        );
    });

    return newBody;
};

export const getNonNullRefs = (
    note: Note,
    notes: Note[]
): { ref: string; note: Note }[] => {
    const refs = getRefs(note, notes);
    return refs.filter((ref) => !!ref.note) as { ref: string; note: Note }[];
};

export const getRefs = (
    note: Note,
    notes: Note[]
): { ref: string; note: Note | undefined }[] => {
    const findNoteFromRef = (ref: string) => {
        return notes.find((note) => `${note.directory}/${note.title}` === ref);
    };

    const regex = /\]\(ref\((\S+)\)\)/g;
    const matches = note.body.matchAll(regex);
    const refNames = Array.from(matches).map((match) =>
        match[1].replace(/_/g, ' ')
    );

    const refedNotes = refNames.map((ref) => ({
        ref,
        note: findNoteFromRef(ref)
    }));

    return refedNotes;
};
