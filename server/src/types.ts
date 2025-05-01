export interface Note {
    id: number;
    title: string;
    body: string;
    directory: string;
    updatedAt: number;
}

export type GoodResponse<T> = {
    data: T;
};

export type BadResponse = {
    error: string;
};

export type Response<T> = GoodResponse<T> | BadResponse;

export type ApiHeaders = Record<string, string | number | boolean>;

export type GetNotesResponse = { notes: Note[] };

export type CreateNoteResponse = { message: string };
export type CreateNoteHeaders = ApiHeaders & {
    title: string;
    body: string;
    directory: string;
    id: number;
};
