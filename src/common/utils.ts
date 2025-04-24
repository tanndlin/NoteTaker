import ReactDOM from 'react-dom';

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
