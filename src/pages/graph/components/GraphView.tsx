import React from 'react';
import Graph from 'react-graph-vis';
import { getRefs } from '../../../common/bodyToView';
import { getHeirarchy } from '../../../common/FolderView/FolderView';
import { Directory, Note } from '../../../common/types';
import { IGraph } from '../graph.types';

type GraphProps = { notes: Note[] };

const GraphView = (props: GraphProps) => {
    const { notes } = props;

    const [graph, setGraph] = React.useState({
        nodes: [],
        edges: []
    } as IGraph);

    React.useEffect(() => {
        setGraph(getGraph());
    }, [notes]);

    const getGraph = () => {
        const graph: IGraph = { nodes: [], edges: [] };
        notes.forEach((note) => {
            graph.nodes.push({
                id: note.id,
                label: note.title,
                size: 10,
                group: note.directory.split('/')[1] || 'root',
                font: { face: 'roboto' }
            });
        });

        const heirarchy = getHeirarchy(notes, '');
        const addHeiarchyEdges = (heirarchy: Directory, parentID: number) => {
            if (parentID !== -1) {
                heirarchy.notes.forEach((note) => {
                    graph.edges.push({ from: parentID, to: note.id });
                });
            }

            Object.keys(heirarchy.dirs).forEach((dir) => {
                const id = graph.nodes.length;
                graph.nodes.push({
                    id,
                    label: dir,
                    size: 20,
                    group: dir.split('/')[1] || 'root',
                    font: { face: 'roboto' }
                });
                graph.edges.push({ from: parentID, to: id });
                addHeiarchyEdges(heirarchy.dirs[dir], id);
            });
        };

        addHeiarchyEdges(heirarchy, -1);

        // Add reference edges
        notes.forEach((note) => {
            const refs = getRefs(note, notes);
            refs.forEach((ref) => {
                graph.edges.push({ from: note.id, to: ref.note.id, width: 3 });
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
        const twoWayConnections: Set<number>[] = [];
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
                width: 3,
                arrows: { to: { enabled: false } }
            });
        });

        return graph;
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

    const groups: any = {};
    Object.keys(getHeirarchy(notes, '').dirs).forEach((dir, i) => {
        groups[dir] = {
            color: colors[i % colors.length]
        };
    });

    const options = {
        layout: {
            hierarchical: false
        },
        nodes: {
            shape: 'dot',
            size: 10,
            font: {
                size: 20,
                color: '#ffffff'
            },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            color: { inherit: true },
            width: 0.15,
            smooth: {
                type: 'continuous'
            }
        },
        groups,
        autoResize: true
    };

    const events = {
        select: function (event: { nodes: number[]; edges: string[] }) {
            const { nodes, edges } = event;
            console.log('Selected nodes:');
            console.log(nodes);
            console.log('Selected edges:');
            console.log(edges);
        }
    };

    return (
        <div className="w-full h-full">
            <Graph graph={graph} options={options} events={events} />
        </div>
    );
};

export default GraphView;
