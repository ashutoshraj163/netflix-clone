import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export function Navbar() {
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', path: '/explore' },
        { label: 'TV Shows', path: '/explore?type=series' },
        { label: 'Movies', path: '/explore?type=movie' },
        { label: 'My List', path: '/watchlist' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'glass shadow-2xl border-b border-white/5' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
            )}
        >
            <nav className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-5 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to={user ? '/explore' : '/'}
                    className="flex items-center gap-2 group"
                    aria-label="Streamix Home"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#E50914] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        <span className="text-2xl md:text-3xl font-bold tracking-tighter text-[#E50914] relative">STREAMIX</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                {user && (
                    <div className="hidden md:flex items-center gap-10 ml-12">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'text-sm font-medium transition-all duration-300 hover:text-white relative group',
                                    location.pathname === link.path.split('?')[0]
                                        ? 'text-white'
                                        : 'text-gray-300'
                                )}
                            >
                                {link.label}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-full h-0.5 bg-[#E50914] rounded-full transform origin-left transition-transform duration-300",
                                    location.pathname === link.path.split('?')[0] ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )} />
                            </Link>
                        ))}
                    </div>
                )}

                {/* Right Side Actions */}
                <div className="flex items-center gap-7">
                    {user ? (
                        <>
                            {/* Search */}
                            <div className="relative group">
                                {isSearchOpen ? (
                                    <div className="flex items-center glass-input rounded-full px-3 py-1.5 animate-scale-in border border-white/10">
                                        <Search className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Titles, people, genres"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="bg-transparent text-white text-sm px-3 w-56 focus:outline-none placeholder:text-gray-500"
                                            autoFocus
                                            onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                        />
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setIsSearchOpen(false);
                                            }}
                                            className="p-1 hover:text-white text-gray-400 transition-colors"
                                            aria-label="Close search"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsSearchOpen(true)}
                                        className="p-2 hover:text-white text-gray-300 transition-all hover:scale-110"
                                        aria-label="Open search"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Notifications */}
                            <button
                                className="p-2 hover:text-white text-gray-300 transition-all hover:scale-110 hidden sm:block relative"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 group focus:outline-none"
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="true"
                                >
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'User'}`}
                                        alt="Profile"
                                        className="w-9 h-9 rounded bg-[#141414] border border-white/20 transition-transform group-hover:scale-105 group-hover:border-white/40"
                                    />
                                    <ChevronDown
                                        className={cn(
                                            'w-4 h-4 text-gray-300 transition-transform duration-300',
                                            isProfileOpen && 'rotate-180'
                                        )}
                                    />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-5 w-60 glass-card rounded-xl py-3 animate-slide-up origin-top-right ring-1 ring-white/10 shadow-2xl">
                                        <div className="px-5 py-4 border-b border-white/10">
                                            <p className="text-sm text-white font-semibold truncate">{profile?.name || 'User'}</p>
                                            <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <div className="py-2">
                                            <Link
                                                to="/profile"
                                                className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Manage Profiles
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Account & Settings
                                            </Link>
                                            <div className="border-t border-white/10 my-2" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-300 hover:text-white md:hidden"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#E50914] hover:bg-[#B20710] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-glow"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            {user && isMenuOpen && (
                <div className="md:hidden bg-black/95 border-t border-gray-800 animate-slide-up">
                    <div className="px-4 py-4 space-y-3">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'block py-2 text-base font-medium transition-colors',
                                    location.pathname === link.path.split('?')[0]
                                        ? 'text-white'
                                        : 'text-gray-300 hover:text-white'
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
