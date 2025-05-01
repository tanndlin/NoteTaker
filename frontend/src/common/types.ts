import { Auth, User } from 'firebase/auth';

export interface Note {
    id: number;
    title: string;
    body: string;
    directory: string;
    updatedAt: number;
}

export interface StoredNote extends Note {
    changed: boolean;
}

export type IconProps = {
    className?: string;
};

export type Directory = {
    notes: StoredNote[];
    dirs: { [key: string]: Directory };
};

export type Configs = {
    general: GeneralConfigs;
    export: ExportConfigs;
    appearance: AppearanceConfigs;
};

export type GeneralConfigs = {
    askOnDelete: boolean;
    createUnfilledNote: boolean;
    shorthands: Record<string, string>;
};

export type ExportConfigs = {
    replaceOnImport: boolean;
    resolveConflictsReplace: boolean;
};

export type AppearanceConfigs = {
    previewDelay: number;
};

export const defaultConfigs: Configs = {
    general: {
        askOnDelete: true,
        createUnfilledNote: true,
        shorthands: {}
    },
    export: {
        replaceOnImport: true,
        resolveConflictsReplace: true
    },
    appearance: {
        previewDelay: 500 // Default delay in milliseconds
    }
};

export interface IConfigContext {
    configs: Configs;
    setConfigs: (configs: Configs) => void;
}

export interface IUserContext {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
    auth: Auth;
}
