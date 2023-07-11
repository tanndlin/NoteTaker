export type IGraph = {
    nodes: Node[];
    edges: Edge[];
};

export type Node = {
    id: ID;
    label: string;
    size?: number;
    group?: string;
    font?: Font;
    color?: string;
};

export type Edge = {
    from: ID;
    to: ID;
    width?: number;
    arrows?: Arrow;
};

export type ID = number | string;

export type Font = {
    face: string;
};

export type Arrow = {
    to: ArrowTo;
};

export type ArrowTo = {
    enabled: boolean;
};
