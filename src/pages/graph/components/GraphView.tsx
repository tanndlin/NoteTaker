import React, { useContext } from 'react';
import Graph from 'react-graph-vis';
import { getHeirarchy } from '../../../common/FolderView/FolderView';
import { getRefs } from '../../../common/bodyToView';
import { Directory } from '../../../common/types';
import { ConfigContext } from '../../../contexts/ConfigContext';
import { NoteContext } from '../../../contexts/NoteContext';
import { Edge, ID, IGraph, IGraphConfig, Node } from '../graph.types';
import GraphOptions from './GraphOptions';

type GraphProps = {
    setFilter: React.Dispatch<React.SetStateAction<ID[]>>;
    createNote(qualifiedName: string): void;
};

const GraphView = (props: GraphProps) => {
    const { setFilter, createNote } = props;
    const { configs } = useContext(ConfigContext);
    const { notes } = useContext(NoteContext);

    const [config, setConfig] = React.useState(
        JSON.parse(
            localStorage.getItem('graphConfig') ||
                '{"nodeSize": 10, "edgeSize":3, "showFolders": false}'
        ) as IGraphConfig
    );
    const [nodesLeftToAdd, setNodesLeftToAdd] = React.useState([] as Node[]);
    const [edges, setEdges] = React.useState([] as Edge[]);
    const [index, setIndex] = React.useState(0);
    const [graph, setGraph] = React.useState({
        nodes: [],
        edges: []
    } as IGraph);

    React.useEffect(() => {
        const graph = getGraph();
        setGraph(graph);
        setEdges(graph.edges);
    }, [notes]);

    React.useEffect(() => {
        setOptions({
            ...options,
            nodes: {
                ...options.nodes,
                size: config.nodeSize
            },
            edges: {
                ...options.edges,
                width: config.edgeSize
            }
        });

        localStorage.setItem('graphConfig', JSON.stringify(config));
    }, [config]);

    React.useEffect(() => {
        const graph = getGraph();
        setGraph(graph);
        setEdges(graph.edges);
    }, [config.showFolders]);

    React.useEffect(() => {
        if (!nodesLeftToAdd.length) {
            return;
        }

        if (index > nodesLeftToAdd.length) {
            setNodesLeftToAdd([]);
            setIndex(0);
            return;
        }

        setTimeout(() => {
            setGraph({
                nodes: nodesLeftToAdd.slice(0, index),
                edges: edges
            });
            setIndex(index + 1);
        }, 100);
    }, [graph, index, nodesLeftToAdd]);

    const getGraph = () => {
        const graph: IGraph = { nodes: [], edges: [] };
        notes.forEach((note) => {
            graph.nodes.push({
                id: note.id,
                label: note.title,
                group: note.directory.split('/')[1] || 'root'
            });
        });

        const heirarchy = getHeirarchy(notes, () => true);
        const addHeiarchyEdges = (heirarchy: Directory, parentID: ID) => {
            if (parentID !== -1) {
                heirarchy.notes.forEach((note) => {
                    graph.edges.push({ from: parentID, to: note.id });
                });
            }

            Object.keys(heirarchy.dirs).forEach((dir) => {
                const id = dir;
                graph.nodes.push({
                    id,
                    label: dir,
                    size: 20,
                    group: dir.split('/')[1] || 'root'
                });
                graph.edges.push({ from: parentID, to: id });
                addHeiarchyEdges(heirarchy.dirs[dir], id);
            });
        };

        // Add nodes that represent an unfilled node
        notes.forEach((note) => {
            const refs = getRefs(note, notes);
            const unfilled = refs.filter((ref) => !ref.note);
            // Remove duplicates
            const unique = unfilled.filter(
                (ref) => !graph.nodes.find((node) => node.id === ref.ref)
            );

            unique.forEach((ref) => {
                const split = ref.ref.split('/');
                const name = split[split.length - 1];

                graph.nodes.push({
                    id: ref.ref,
                    label: name,
                    size: 10,
                    group: ref.ref.split('/')[1] || 'root',
                    color: '#515151'
                });
            });
        });

        if (config.showFolders) {
            addHeiarchyEdges(heirarchy, -1);
        }

        // Add reference edges
        notes.forEach((note) => {
            const refs = getRefs(note, notes);
            refs.forEach((ref) => {
                if (!ref.note) {
                    graph.edges.push({
                        from: note.id,
                        to: ref.ref
                    });
                    return;
                }

                graph.edges.push({ from: note.id, to: ref.note.id });
            });
        });

        // Find duplicate edges with reversed to and from
        const duplicateEdges = graph.edges.filter((edge) => {
            return (
                graph.edges.findIndex(
                    (e) => e.from === edge.to && e.to === edge.from
                ) !== -1
            );
        });

        // Delete duplicate edges
        duplicateEdges.forEach((edge) => {
            const index = graph.edges.findIndex(
                (e) => e.from === edge.from && e.to === edge.to
            );
            graph.edges.splice(index, 1);
        });

        // Get each double edge connection
        const twoWayConnections: Set<ID>[] = [];
        duplicateEdges.forEach((edge) => {
            const index = twoWayConnections.findIndex((set) => {
                return set.has(edge.from) && set.has(edge.to);
            });
            if (index === -1) {
                twoWayConnections.push(new Set([edge.from, edge.to]));
            }
        });

        // Add an edge for each two way connection
        twoWayConnections.forEach((set) => {
            const from = Array.from(set)[0];
            const to = Array.from(set)[1];
            graph.edges.push({
                from,
                to,
                arrows: { to: { enabled: false } }
            });
        });

        return graph;
    };

    const getGroups = () => {
        const groups: { [key: string]: { color: string } } = {};
        Object.keys(getHeirarchy(notes, () => true).dirs).forEach((dir, i) => {
            groups[dir] = {
                color: colors[i % colors.length]
            };
        });

        return groups;
    };

    const colors = [
        '#e6194b',
        '#3cb44b',
        '#ffe119',
        '#4363d8',
        '#f58231',
        '#911eb4',
        '#46f0f0',
        '#f032e6'
    ];

    const events = {
        select: function (event: {
            nodes: (number | string)[];
            edges: string[];
        }) {
            const { nodes } = event;
            setFilter(nodes);

            if (nodes.length === 1) {
                const [node] = nodes;

                const found = notes.find((note) => note.id === node);
                if (!found && configs.general.createUnfilledNote) {
                    createNote(node + '');
                }
            }
        }
    };

    const startTimelapse = () => {
        setNodesLeftToAdd([...graph.nodes]);
        setGraph({ nodes: [], edges });
    };

    const [options, setOptions] = React.useState({
        layout: {
            hierarchical: false
        },
        nodes: {
            shape: 'dot',
            size: config.nodeSize,
            font: {
                size: 20,
                color: '#ffffff',
                face: 'roboto'
            },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            color: { inherit: true },
            width: config.edgeSize,
            smooth: {
                type: 'continuous'
            }
        },
        groups: getGroups(),
        autoResize: true,
        physics: {
            barnesHut: {
                gravitationalConstant: -5000,
                springConstant: 0.001,
                springLength: 200
            }
        }
    });

    return (
        <div className="relative w-full h-full">
            <GraphOptions
                config={config}
                setConfig={setConfig}
                startTimelapse={startTimelapse}
            />
            <Graph graph={graph} options={options} events={events} />
        </div>
    );
};

export default GraphView;
