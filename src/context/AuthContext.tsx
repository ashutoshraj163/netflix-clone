import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Profile, Settings } from '@/types';
import { mockProfiles, mockSettings } from '@/data/mockData';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    settings: Settings;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    selectProfile: (profile: Profile) => void;
    updateSettings: (settings: Partial<Settings>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [settings, setSettings] = useState<Settings>(mockSettings);
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (email: string, _password: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: '🎬',
            createdAt: new Date(),
        };

        setUser(mockUser);
        setProfile(mockProfiles[0]);
        setIsLoading(false);
    }, []);

    const signup = useCallback(async (email: string, _password: string, name: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: '1',
            email,
            name,
            avatar: '🎬',
            createdAt: new Date(),
        };

        setUser(mockUser);
        setProfile(mockProfiles[0]);
        setIsLoading(false);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setProfile(null);
    }, []);

    const selectProfile = useCallback((selectedProfile: Profile) => {
        setProfile(selectedProfile);
    }, []);

    const updateSettings = useCallback((newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                settings,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                logout,
                selectProfile,
                updateSettings,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
