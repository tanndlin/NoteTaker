/* eslint-disable @typescript-eslint/no-empty-function */
import { initializeApp } from 'firebase/app';
import { Db, MongoClient } from 'mongodb';
import React, { createContext, useEffect, useState } from 'react';

type Props = {
    children?: React.ReactNode;
};

export const DBContext = createContext({
    client: {} as MongoClient,
    db: {} as Db
});

export const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
});

const DBProvider = ({ children }: Props) => {
    const [client, setClient] = useState(
        new MongoClient(import.meta.env.VITE_MONGODB_URI)
    );
    const [db, setDB] = useState<Db>({} as Db);

    // Close the client connection when the component unmounts
    useEffect(() => {
        client
            .connect()
            .then(() => {
                const database = client.db(
                    import.meta.env.VITE_MONGODB_DB_NAME
                );
                setDB(database);
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });
        return () => {
            client.close().catch((error) => {
                console.error('Error closing MongoDB client:', error);
            });
        };
    }, [client]);

    return (
        <DBContext.Provider
            value={{
                client,
                db
            }}
        >
            {children}
        </DBContext.Provider>
    );
};

export default DBProvider;
