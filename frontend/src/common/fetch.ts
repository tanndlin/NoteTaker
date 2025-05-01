import {
    ApiHeaders,
    CreateNoteHeaders,
    CreateNoteResponse
} from '@backend/types';
import axios from 'axios';
import { useState } from 'react';
import { StoredNote } from './types';

export type Props = {
    endpoint: string;
    method: 'GET' | 'POST';
    token?: string;
};

export const apiFetch = <X, T extends ApiHeaders | null = null>({
    endpoint,
    method,
    token
}: Props) => {
    const [res, setRes] = useState<X | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    type FetchDataType = T extends null
        ? (body?: null, callback?: Function) => Promise<void>
        : (body: T, callback?: Function) => Promise<void>;

    const fetchData = (async (body?: T, callback?: Function) => {
        try {
            const response = await (method === 'GET'
                ? axios.get(`/api/${endpoint}`, {
                      data: body,
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
                : axios.post(`/api/${endpoint}`, body, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }));

            // Check if 2xx
            if (response.status < 200 || response.status >= 300) {
                console.error(response.data);
                setError(`Error: ${response.status} ${response.statusText}`);
                setLoading(false);
                return;
            }

            const data = response.data as X;
            setRes(data as X);
            setLoading(false);

            if (callback) {
                callback(data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data);
                setError(`Error: ${err.response?.status} ${err.message}`);
            } else {
                console.error(err);
                setError(`Error: ${err}`);
            }
            setLoading(false);
        }
    }) as FetchDataType;

    return { res, error, loading, fetchData };
};

export function updateNote(note: StoredNote) {
    if (!note.changed) return;

    console.log('Updating note', note);

    const { id, title, body, directory } = note;
    const { fetchData } = apiFetch<CreateNoteResponse, CreateNoteHeaders>({
        endpoint: 'notes/create',
        method: 'POST',
        token: localStorage.getItem('token') ?? undefined
    });

    return () =>
        fetchData({
            id,
            title,
            body,
            directory
        });
}
