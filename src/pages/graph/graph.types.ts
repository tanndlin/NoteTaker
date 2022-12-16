export type IGraph = {
    nodes: Node[];
    edges: Edge[];
};

export type Node = {
    id: number;
    label: string;
    size?: number;
    group?: string;
    font?: Font;
};

export type Edge = {
    from: number;
    to: number;
    width?: number;
    arrows?: Arrow;
};

export type Font = {
    face: string;
};

export type Arrow = {
    to: ArrowTo;
};

export type ArrowTo = {
    enabled: boolean;
};
