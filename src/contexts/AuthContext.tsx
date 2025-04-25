/* eslint-disable @typescript-eslint/no-empty-function */
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut
}

//https://medium.com/@remind.stephen.to.do.sth/hands-on-guide-to-secure-react-routes-with-authentication-context-971f37ede990
export interface IAuth {
    authStatus: AuthStatus;
    auth?: Auth;
    signIn?: () => void;
    signOut?: () => void;
}

const defaultState: IAuth = {
    authStatus: AuthStatus.Loading
};

type Props = {
    children?: React.ReactNode;
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
    const { authStatus }: IAuth = useContext(AuthContext);
    return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
    const { authStatus }: IAuth = useContext(AuthContext);
    return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthProvider = ({ children }: Props) => {
    const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
    const app = initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    });
    const [auth, setAuth] = useState<Auth>(getAuth());

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setAuthStatus(user ? AuthStatus.SignedIn : AuthStatus.SignedOut);
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
        auth,
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
