import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../common/firebase';
import { AuthContext, AuthStatus } from '../../contexts/AuthContext';
import './LoginPage.scss';

type Props = {};

const LoginPage: FC<Props> = ({}) => {
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
    const [showPassword, setShowPassword] = React.useState(false);
    const [showForgotPassword, setShowForgotPassword] = React.useState(false);

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
                <main className="flex flex-col h-full">
                    <div className="login-container">
                        <div className="logo">
                            <div className="logo-icon"></div>
                            <h1>NoteTaker</h1>
                            {isLogin ? (
                                <p>Welcome back! Sign in to your account</p>
                            ) : (
                                <p>Create an account to get started</p>
                            )}
                        </div>

                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    <span className="input-icon">📧</span>
                                </div>
                                <div
                                    className="error-message"
                                    id="emailError"
                                ></div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-container">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    <span
                                        className="input-icon password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        👁️
                                    </span>
                                </div>
                                <div className="forgot-password">
                                    <a
                                        href="#"
                                        onClick={() =>
                                            setShowForgotPassword(true)
                                        }
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div
                                    className="error-message"
                                    id="passwordError"
                                ></div>
                            </div>

                            <button type="submit" className="login-btn">
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="signup-link">
                            {isLogin
                                ? "Don't have an account?"
                                : 'Already have an account?'}{' '}
                            <a href="#" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Create one' : 'Login'}
                            </a>
                            <div
                                className={
                                    'error-message' + (error ? ' show' : '')
                                }
                            >
                                {error}
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default LoginPage;
