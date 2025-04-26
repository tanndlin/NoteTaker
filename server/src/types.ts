import { Note } from '@frontend/common/types';
export type GoodResponse<T> = {
    data: T;
};

export type BadResponse = {
    error: string;
};

export type Response<T> = GoodResponse<T> | BadResponse;

export type GetNotesResponse =
    | {
          notes: Note[];
      }
    | BadResponse;

export type CreateNoteResponse =
    | {
          message: string;
      }
    | BadResponse;
