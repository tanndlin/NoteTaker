import { ApiHeaders } from '@backend/types';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

export type Props<T extends ApiHeaders = {}> = {
    endpoint: string;
    headers: T;
    method: 'GET' | 'POST';
    token?: string;
};

export const apiFetch = <X, T extends ApiHeaders = {}>({
    endpoint,
    headers,
    method,
    token
}: Props<T>) => {
    const [res, setRes] = useState<X | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            let response: AxiosResponse;
            if (method === 'GET') {
                response = await axios.get(`/api/${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ...headers
                    }
                });
            } else if (method === 'POST') {
                response = await axios.post(`/api/${endpoint}`, headers, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ...headers
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
    };

    return { res, error, loading, fetchData };
};
