import { FC } from 'react';
import AnimatedNumber from '../../../common/AnimatedNumbers/AnimatedNumber';
import { StoredNote } from '../../../common/types';
import { getRefs } from '../../../common/utils';

type Props = {
    note: StoredNote;
    notes: StoredNote[];
};

const Stats: FC<Props> = ({ note, notes }) => {
    const numRefs = getRefs(note, notes).length;
    const numWords = note.body.split(/\s+/).length + 1;
    const numChars = note.body.length;

    return (
        <div className="flex justify-between mx-8 mt-16">
            <span className="flex flex-col">
                <h2 className="mx-auto">Refs</h2>
                <div className="mx-auto">
                    <AnimatedNumber number={numRefs} />
                </div>
            </span>
            <span className="flex flex-col">
                <h2 className="mx-auto">Words</h2>
                <div className="mx-auto">
                    <AnimatedNumber number={numWords} />
                </div>
            </span>
            <span className="flex flex-col">
                <h2 className="mx-auto">Characters</h2>
                <div className="mx-auto">
                    <AnimatedNumber number={numChars} />
                </div>
            </span>
        </div>
    );
};

export default Stats;
