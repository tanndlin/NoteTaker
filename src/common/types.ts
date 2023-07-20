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
    export: ExportConfigs;
};

export type GeneralConfigs = {
    askOnDelete: boolean;
    createUnfilledNote: boolean;
};

export type ExportConfigs = {
    replaceOnImport: boolean;
    resolveConflictsReplace: boolean;
};

export const defaultConfigs: Configs = {
    general: {
        askOnDelete: true,
        createUnfilledNote: true
    },
    export: {
        replaceOnImport: true,
        resolveConflictsReplace: true
    }
};
