import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Foldable from '../../../common/Foldable';
import { IGraphConfig } from '../graph.types';

type Props = {
    config: IGraphConfig;
    setConfig: React.Dispatch<React.SetStateAction<IGraphConfig>>;
    startTimelapse: () => void;
};

const GraphOptions = (props: Props) => {
    const { config, setConfig, startTimelapse } = props;
    const { nodeSize, edgeSize, showFolders } = config;

    const setNodeSize = (value: number) => {
        setConfig({ ...config, nodeSize: value });
    };

    const setEdgeSize = (value: number) => {
        setConfig({ ...config, edgeSize: value });
    };

    const toggleShowFolders = () => {
        setConfig({ ...config, showFolders: !showFolders });
    };

    return (
        <div className="absolute top-0 right-0 z-10 flex flex-col gap-4 mr-4">
            <div className="graph-options">
                <Foldable title="Config" className="flex">
                    <Foldable title="Size" className="flex mt-2">
                        <span className="flex flex-col">
                            <label htmlFor="nodeSize">Node Size</label>
                            <input
                                type="range"
                                value={nodeSize}
                                min={10}
                                max={100}
                                onChange={(e) => setNodeSize(+e.target.value)}
                            />
                        </span>
                        <span className="flex flex-col">
                            <label htmlFor="edgeSize">Edge Size</label>
                            <input
                                type="range"
                                value={edgeSize}
                                min={1}
                                max={10}
                                onChange={(e) => setEdgeSize(+e.target.value)}
                            />
                        </span>
                    </Foldable>
                    <span className="flex flex-col mt-2">
                        <label htmlFor="showFolders">Show Folders</label>
                        <input
                            type="checkbox"
                            checked={showFolders}
                            onChange={toggleShowFolders}
                        />
                    </span>
                </Foldable>
            </div>

            <button
                onClick={startTimelapse}
                className="flex w-12 h-12 ml-auto bg-tertiary circle"
            >
                <ArrowPathIcon className="w-6 h-6 m-auto" />
            </button>
        </div>
    );
};

export default GraphOptions;
