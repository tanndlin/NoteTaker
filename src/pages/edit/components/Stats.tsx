import { getRefs } from '../../../common/bodyToView';
import { Note } from '../../../common/types';

type Props = {
    note: Note;
    notes: Note[];
};

const Stats = (props: Props) => {
    const { note, notes } = props;

    const numRefs = getRefs(note, notes).length;
    const numWords = note.body.split(/\s+/).length + 1;
    const numChars = note.body.length;

    return (
        <div className="mx-8 mt-16 flex justify-between">
            <span className="flex flex-col">
                <h2 className="mx-auto">Refs</h2>
                <p className="mx-auto">{numRefs}</p>
            </span>
            <span className="flex flex-col">
                <h2 className="mx-auto">Words</h2>
                <p className="mx-auto">{numWords}</p>
            </span>
            <span className="flex flex-col">
                <h2 className="mx-auto">Characters</h2>
                <p className="mx-auto">{numChars}</p>
            </span>
        </div>
    );
};

export default Stats;
