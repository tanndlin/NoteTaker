import { ArrowPathIcon } from '@heroicons/react/24/solid';

type Props = {
    startTimelapse: () => void;
};

const GraphOptions = (props: Props) => {
    const { startTimelapse } = props;

    return (
        <div className="absolute top-0 right-0 z-10">
            <button
                onClick={startTimelapse}
                className="w-12 h-12 bg-tertiary circle flex"
            >
                <ArrowPathIcon className="m-auto w-6 h-6" />
            </button>
        </div>
    );
};

export default GraphOptions;
