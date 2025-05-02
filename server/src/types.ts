export type NoteBase = {
    id: number;
};

export type DeletedNote = NoteBase & {
    deleted: true;
};

export type ExistingNote = NoteBase & {
    title: string;
    body: string;
    directory: string;
    updatedAt: number;
    deleted: false;
};

export type Note = DeletedNote | ExistingNote;

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

export type DeleteNoteResponse = { message: string };
export type DeleteNoteHeaders = ApiHeaders & {
    id: number;
};
