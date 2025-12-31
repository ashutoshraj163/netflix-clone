import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useWatchlist } from '@/context/WatchlistContext';
import { MovieCard } from '@/components/MovieCard';
import { Grid, List, SortAsc, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types';
import { Link } from 'react-router-dom';

type ViewMode = 'grid' | 'list';
type SortBy = 'dateAdded' | 'title' | 'rating';

export function Watchlist() {
    const { getWatchlistMovies, removeFromWatchlist } = useWatchlist();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortBy>('dateAdded');

    const movies = getWatchlistMovies().filter(Boolean) as Movie[];

    const sortedMovies = [...movies].sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-[#141414]">
            <Navbar />

            <main className="page-header pb-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-white section-title">My List</h1>

                        <div className="flex items-center gap-4">
                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <SortAsc className="w-5 h-5 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                                    className="bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                                    aria-label="Sort by"
                                >
                                    <option value="dateAdded">Date Added</option>
                                    <option value="title">Title</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        'p-2 transition-colors',
                                        viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                                    )}
                                    aria-label="Grid view"
                                    aria-pressed={viewMode === 'grid'}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={cn(
                                        'p-2 transition-colors',
                                        viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                                    )}
                                    aria-label="List view"
                                    aria-pressed={viewMode === 'list'}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {movies.length === 0 ? (
                        <div className="empty-state py-24">
                            <div className="text-7xl mb-6">📺</div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Your list is empty</h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                Add movies and TV shows to your list to watch them later
                            </p>
                            <Link
                                to="/explore"
                                className="inline-block btn-gradient btn-shimmer text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
                            >
                                Browse Content
                            </Link>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
                            {sortedMovies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} size="lg" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {sortedMovies.map(movie => (
                                <div
                                    key={movie.id}
                                    className="flex gap-5 list-item-glass rounded-xl overflow-hidden group">
                                    <Link to={`/watch/${movie.id}`} className="shrink-0">
                                        <img
                                            src={movie.thumbnail}
                                            alt={movie.title}
                                            className="w-36 h-52 object-cover"
                                        />
                                    </Link>
                                    <div className="flex-1 py-5 pr-5">
                                        <Link
                                            to={`/watch/${movie.id}`}
                                            className="text-xl font-semibold text-white hover:text-gray-300"
                                        >
                                            {movie.title}
                                        </Link>
                                        <div className="flex items-center gap-4 mt-2.5 text-sm text-gray-400">
                                            <span className="text-green-400 font-semibold">{movie.rating} Rating</span>
                                            <span>{movie.year}</span>
                                            <span className="meta-tag">{movie.maturityRating}</span>
                                            <span>{movie.duration}</span>
                                        </div>
                                        <p className="text-gray-400 mt-4 line-clamp-2">{movie.description}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-4">
                                            {movie.genres.map(genre => (
                                                <span
                                                    key={genre}
                                                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromWatchlist(movie.id)}
                                        className="self-center p-4 mr-5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        aria-label={`Remove ${movie.title} from list`}
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
