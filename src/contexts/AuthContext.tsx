/* eslint-disable @typescript-eslint/no-empty-function */
import { initializeApp } from 'firebase/app';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../common/firebase';

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut
}

export type IAuth = typeof defaultState;
const defaultState = {
    authStatus: AuthStatus.Loading,
    signIn: () => {},
    signOut: () => {}
};

type Props = {
    children?: React.ReactNode;
};

export const AuthContext = React.createContext<IAuth>(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
    const { authStatus }: IAuth = useContext(AuthContext);
    return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
    const { authStatus }: IAuth = useContext(AuthContext);
    return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
export const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
});

const AuthProvider = ({ children }: Props) => {
    const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);

    useEffect(() => {
        console.log('Firebase Auth:', auth);
        auth.onAuthStateChanged((user) => {
            setAuthStatus(user ? AuthStatus.SignedIn : AuthStatus.SignedOut);
            console.log('User state changed:', user);
        });
    }, [auth]);

    function signIn() {
        setAuthStatus(AuthStatus.SignedIn);
    }

    function signOut() {
        auth.signOut().then(() => {
            setAuthStatus(AuthStatus.SignedOut);
        });
    }

    const state: IAuth = {
        authStatus,
        signIn,
        signOut
    };

    return (
        <AuthContext.Provider value={state}>
            {authStatus !== AuthStatus.Loading ? (
                children
            ) : (
                <div className="flex items-center justify-center w-screen h-screen">
                    <div className="loader">Logging you in...</div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
