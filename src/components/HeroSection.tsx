import { Link } from 'react-router-dom';
import { Play, Info, Plus, Check, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import type { Movie } from '@/types';

interface HeroSectionProps {
    movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
    const [isMuted, setIsMuted] = useState(true);
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistToggle = () => {
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }
    };

    return (
        <section className="relative h-[75vh] md:h-[90vh] min-h-[550px]" aria-label="Featured content">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={movie.backdrop}
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-[18%] md:bottom-[20%] left-0 right-0 px-4 md:px-12 max-w-4xl z-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl animate-slide-up tracking-tighter">
                    {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-5 mb-10 text-base md:text-lg text-gray-200 animate-slide-up font-medium" style={{ animationDelay: '0.1s' }}>
                    <span className="text-[#46d369] font-bold drop-shadow-md">{movie.rating} Match</span>
                    <span>{movie.year}</span>
                    <span className="meta-tag">{movie.maturityRating}</span>
                    <span>{movie.duration}</span>
                    <span className="meta-tag ring-1 ring-white/30">HD</span>
                </div>

                <p className="text-gray-100 text-lg md:text-xl max-w-2xl line-clamp-3 mb-12 animate-slide-up leading-relaxed drop-shadow-md" style={{ animationDelay: '0.2s' }}>
                    {movie.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 md:gap-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <Link
                        to={`/watch/${movie.id}`}
                        className="flex items-center gap-3 bg-white hover:bg-white/90 text-black font-bold px-10 md:px-12 py-4 md:py-5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        <Play className="w-7 h-7 fill-black" />
                        <span className="text-lg">Play</span>
                    </Link>

                    <button
                        onClick={handleWatchlistToggle}
                        className="flex items-center gap-3 glass-card hover:bg-white/20 text-white font-bold px-10 md:px-12 py-4 md:py-5 rounded-xl transition-all hover:scale-105 active:scale-95 ring-1 ring-white/30"
                    >
                        {inWatchlist ? (
                            <>
                                <Check className="w-7 h-7" />
                                <span className="text-lg">My List</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-7 h-7" />
                                <span className="text-lg">My List</span>
                            </>
                        )}
                    </button>

                    <Link
                        to={`/watch/${movie.id}`}
                        className="flex items-center gap-3 glass-card hover:bg-white/20 text-white font-bold px-10 md:px-12 py-4 md:py-5 rounded-xl transition-all hover:scale-105 active:scale-95 ring-1 ring-white/30"
                    >
                        <Info className="w-7 h-7" />
                        <span className="text-lg">More Info</span>
                    </Link>
                </div>
            </div>

            {/* Mute/Unmute Button */}
            <div className="absolute bottom-[20%] right-0 flex items-center">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="mr-6 p-4 rounded-full glass-card hover:bg-white/20 transition-all hover:scale-110 active:scale-95 group ring-1 ring-white/30"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted ? (
                        <VolumeX className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" />
                    ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                    )}
                </button>
                <div className="bg-gradient-to-l from-black/80 to-black/40 border-l-4 border-[#E50914] py-2 px-6 pr-12 backdrop-blur-md">
                    <span className="text-white text-lg font-bold tracking-wider">{movie.maturityRating}</span>
                </div>
            </div>
        </section>
    );
}
