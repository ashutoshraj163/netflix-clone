import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check, ChevronDown, Star } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types';

interface MovieCardProps {
    movie: Movie;
    index?: number;
    showNumber?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function MovieCard({ movie, index, showNumber = false, size = 'md' }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }
    };

    const sizeClasses = {
        sm: 'w-36 h-52',
        md: 'w-44 h-60 md:w-52 md:h-72',
        lg: 'w-52 h-72 md:w-60 md:h-80',
    };

    return (
        <Link
            to={`/watch/${movie.id}`}
            className="relative shrink-0 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`Watch ${movie.title}`}
        >
            {/* Number Badge for Top 10 */}
            {showNumber && index !== undefined && (
                <span className="absolute -left-4 bottom-0 text-[8rem] font-bold text-stroke leading-none z-10 pointer-events-none select-none opacity-80">
                    {index + 1}
                </span>
            )}

            <div
                className={cn(
                    sizeClasses[size],
                    'relative rounded-xl overflow-hidden movie-card',
                    isHovered && 'scale-110 z-20 shadow-[0_0_30px_rgba(229,9,20,0.5)] ring-2 ring-[#E50914]/80'
                )}
            >
                {/* Thumbnail */}
                <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Hover Overlay */}
                <div
                    className={cn(
                        'absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300',
                        isHovered ? 'opacity-100' : 'opacity-0'
                    )}
                />

                {/* Hover Content */}
                {isHovered && (
                    <div className="absolute inset-0 flex flex-col justify-end p-4 animate-fade-in">
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2.5 mb-3">
                            <button
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-110"
                                aria-label="Play"
                            >
                                <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                            </button>
                            <button
                                onClick={handleWatchlistToggle}
                                className={cn(
                                    'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors',
                                    inWatchlist
                                        ? 'border-white bg-white/20'
                                        : 'border-gray-400 hover:border-white'
                                )}
                                aria-label={inWatchlist ? 'Remove from My List' : 'Add to My List'}
                            >
                                {inWatchlist ? (
                                    <Check className="w-4 h-4 text-white" />
                                ) : (
                                    <Plus className="w-4 h-4 text-white" />
                                )}
                            </button>
                            <button
                                className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors ml-auto"
                                aria-label="More info"
                            >
                                <ChevronDown className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Info */}
                        <h3 className="font-bold text-white text-sm line-clamp-1">{movie.title}</h3>
                        <div className="flex items-center gap-2.5 mt-1.5 text-xs">
                            <span className="text-green-400 font-semibold flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                {movie.rating}
                            </span>
                            <span className="text-gray-300">{movie.year}</span>
                            <span className="meta-tag">
                                {movie.maturityRating}
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1.5">
                            {movie.genres.slice(0, 2).join(' • ')}
                        </div>
                    </div>
                )}
            </div>
        </Link >
    );
}
