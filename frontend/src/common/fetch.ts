import { ApiHeaders } from '@backend/types';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

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
        ? (body?: null) => Promise<void>
        : (body: T) => Promise<void>;

    const fetchData = (async (body?: T) => {
        try {
            let response: AxiosResponse;
            if (method === 'GET') {
                response = await axios.get(`/api/${endpoint}`, {
                    data: body,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else if (method === 'POST') {
                response = await axios.post(`/api/${endpoint}`, body, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            if (response!.status !== 200) {
                setError(`Error: ${response!.status} ${response!.statusText}`);
                setLoading(false);
                return;
            }

            console.log(response!);
            const data = response!.data as X;
            console.log(data);
            setRes(data as X);
            setLoading(false);
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
