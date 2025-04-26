import ReactDOM from 'react-dom';
import { Configs, Note } from './types';

export const preProcessNote = (note: Note, notes: Note[], config: Configs) => {
    const withLinks = createLinks(note, notes);
    const withShorthands = replaceShorthands(
        withLinks,
        config.general.shorthands
    );
    return withShorthands;
};

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

const getNonNullRefs = (
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

const replaceShorthands = (
    body: string,
    shorthands: Record<string, string>
) => {
    let newString = body;
    for (const key in shorthands) {
        newString = newString.replaceAll(key, shorthands[key]);
    }

    return newString;
};

export const smoothTransition = (updateDOM: () => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(document as any).startViewTransition) {
        updateDOM();
        return;
    }

    (document as any).startViewTransition(() => {
        ReactDOM.flushSync(() => {
            updateDOM();
        });
    });
};

/**
 * Merges two objects of the same type recursively. Properties from the first object
 * (`a`) take precedence over properties from the second object (`b`). If a property
 * in both objects is an object itself, the function merges them recursively.
 *
 * @template T - The type of the objects to be merged.
 * @param a - The first object, whose properties take precedence.
 * @param b - The second object, whose properties are overridden by `a` where conflicts occur.
 * @returns A new object that is the result of merging `a` and `b`.
 */
export function objectMerge<T>(a: T, b: T): T {
    const merged = { ...b, ...a };
    for (const key in a) {
        if (a[key] && typeof a[key] === 'object') {
            merged[key] = objectMerge(a[key], b[key]);
        }
    }

    return merged;
}
