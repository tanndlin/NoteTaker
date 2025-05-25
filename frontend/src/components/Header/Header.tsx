import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedLink from '../../common/AnimatedLink';
import HomeIcon from '../../common/Icons/HomeIcon';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const location = useLocation();
    const { signOut } = useContext(AuthContext);

    const navLinks = [
        { to: '/', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
        { to: '/search', label: 'Search' },
        { to: '/graph', label: 'Graph' },
        { to: '/settings', label: 'Settings' },
        { to: '/about', label: 'About' }
    ];

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="w-full border-b border-gray-600 bg-gray-800/90 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
                {/* Logo/Brand */}
                <AnimatedLink to="/" className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                        <span className="text-lg font-bold text-white">N</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                        NoteTaker
                    </span>
                </AnimatedLink>

                {/* Navigation Links */}
                <nav className="hidden space-x-6 md:flex">
                    {navLinks.map((link) => (
                        <AnimatedLink
                            key={link.to}
                            to={link.to}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                                isActive(link.to)
                                    ? 'bg-tertiary text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            {link.icon && link.icon}
                            <span>{link.label}</span>
                        </AnimatedLink>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={signOut}
                        className="px-4 py-2 text-sm text-gray-300 transition-colors border border-gray-600 rounded-lg hover:text-white hover:border-gray-500"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-gray-300 hover:text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
