export type IGraph = {
    nodes: Node[];
    edges: Edge[];
};

export type Node = {
    id: number;
    label: string;
    size?: number;
    group?: string;
};

export type Edge = {
    from: number;
    to: number;
    width?: number;
};
