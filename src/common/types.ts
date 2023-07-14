export interface Note {
    id: number;
    title: string;
    body: string;
    directory: string;
}

export type IconProps = {
    className?: string;
};

export type Directory = {
    notes: Note[];
    dirs: { [key: string]: Directory };
};

export type Configs = {
    general: GeneralConfigs;
};

export type GeneralConfigs = {
    askOnDelete: boolean;
};

export const defaultConfigs: Configs = {
    general: {
        askOnDelete: true
    }
};
