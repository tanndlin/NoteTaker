import React from 'react';
import Graph from 'react-graph-vis';
import { getRefs } from '../../../common/bodyToView';
import { getHeirarchy } from '../../../common/FolderView/FolderView';
import { Directory, Note } from '../../../common/types';
import { IGraph } from '../graph.types';

type GraphProps = { notes: Note[] };

const GraphView = (props: GraphProps) => {
    const { notes } = props;

    const getGraph = () => {
        const graph: IGraph = { nodes: [], edges: [] };
        notes.forEach((note) => {
            graph.nodes.push({
                id: note.id,
                label: note.title,
                size: 10,
                group: 'myGroup'
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
                    label: `/${dir}`,
                    size: 20
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
                graph.edges.push({ from: note.id, to: ref.note.id, width: 2 });
            });
        });
        return graph;
    };

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
        height: '100%',
        width: '100%'
    };

    const events = {
        select: function (event: { nodes: any; edges: any }) {
            const { nodes, edges } = event;
            console.log('Selected nodes:');
            console.log(nodes);
            console.log('Selected edges:');
            console.log(edges);
        }
    };

    return (
        <div className="w-full h-full">
            <Graph {...{ graph: getGraph(), options, events }} />
        </div>
    );
};

export default GraphView;
