import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../common/firebase';
import { AuthContext, AuthStatus } from '../../contexts/AuthContext';

type Props = {};

const LoginPage: React.FC<Props> = ({}) => {
    const authContext = useContext(AuthContext);
    const { authStatus } = authContext;
    if (authStatus === AuthStatus.Loading) {
        return null;
    }

    const { signIn } = authContext;

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
            handleLogin(e);
        } else {
            handleSignUp(e);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                signIn!();
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError('Invalid email or password. Please try again.');
            });
    };

    const handleSignUp = (e: React.FormEvent) => {
        createUserWithEmailAndPassword(auth!, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                signIn!();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up:', errorCode, errorMessage);
                setError('Error signing up. Please try again.');
            });
    };

    return (
        <>
            {auth?.currentUser ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="mb-4 text-2xl font-bold">Welcome Back!</h1>
                    <p className="text-gray-600">You are already logged in.</p>
                </div>
            ) : (
                <div className="flex h-screen">
                    <form
                        className="flex flex-col items-center justify-center p-8 m-auto bg-secondary"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="mb-4 text-2xl font-bold">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </h1>
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2 mb-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-2 mb-4 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="p-2 text-white bg-blue-500 rounded">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        <a onClick={() => setIsLogin(!isLogin)} href="#">
                            {isLogin
                                ? 'Need to create an account?'
                                : 'Already have an account?'}
                        </a>
                        {error && <p className="mt-2 text-red-500">{error}</p>}
                    </form>
                </div>
            )}
        </>
    );
};

export default LoginPage;
