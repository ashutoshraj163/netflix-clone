import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Movie, WatchlistItem, ContinueWatching } from '@/types';
import { mockWatchlist, mockContinueWatching, getMovieById } from '@/data/mockData';

interface WatchlistContextType {
    watchlist: WatchlistItem[];
    continueWatching: ContinueWatching[];
    addToWatchlist: (movieId: string) => void;
    removeFromWatchlist: (movieId: string) => void;
    isInWatchlist: (movieId: string) => boolean;
    getWatchlistMovies: () => (Movie | undefined)[];
    getContinueWatchingMovies: () => { movie: Movie | undefined; progress: number }[];
    updateProgress: (movieId: string, progress: number) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist);
    const [continueWatching, setContinueWatching] = useState<ContinueWatching[]>(mockContinueWatching);

    const addToWatchlist = useCallback((movieId: string) => {
        setWatchlist(prev => {
            if (prev.some(item => item.movieId === movieId)) return prev;
            return [...prev, { id: Date.now().toString(), movieId, addedAt: new Date() }];
        });
    }, []);

    const removeFromWatchlist = useCallback((movieId: string) => {
        setWatchlist(prev => prev.filter(item => item.movieId !== movieId));
    }, []);

    const isInWatchlist = useCallback((movieId: string) => {
        return watchlist.some(item => item.movieId === movieId);
    }, [watchlist]);

    const getWatchlistMovies = useCallback(() => {
        return watchlist.map(item => getMovieById(item.movieId));
    }, [watchlist]);

    const getContinueWatchingMovies = useCallback(() => {
        return continueWatching.map(item => ({
            movie: getMovieById(item.movieId),
            progress: item.progress,
        }));
    }, [continueWatching]);

    const updateProgress = useCallback((movieId: string, progress: number) => {
        setContinueWatching(prev => {
            const existing = prev.find(item => item.movieId === movieId);
            if (existing) {
                return prev.map(item =>
                    item.movieId === movieId
                        ? { ...item, progress, lastWatched: new Date() }
                        : item
                );
            }
            return [...prev, { id: Date.now().toString(), movieId, progress, lastWatched: new Date() }];
        });
    }, []);

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                continueWatching,
                addToWatchlist,
                removeFromWatchlist,
                isInWatchlist,
                getWatchlistMovies,
                getContinueWatchingMovies,
                updateProgress,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
}
