import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Play, Pause, Volume2, VolumeX, Maximize, Minimize,
    SkipBack, SkipForward, Settings, Subtitles, ChevronLeft,
    Plus, Check, ThumbsUp, Share2
} from 'lucide-react';
import { getMovieById } from '@/data/mockData';
import { useWatchlist } from '@/context/WatchlistContext';
import { cn } from '@/lib/utils';

export function VideoPlayer() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movie = getMovieById(id || '');
    const { isInWatchlist, addToWatchlist, removeFromWatchlist, updateProgress } = useWatchlist();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(80);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<number>();

    const inWatchlist = movie ? isInWatchlist(movie.id) : false;

    // Hide controls after inactivity
    const resetControlsTimeout = useCallback(() => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
            controlsTimeoutRef.current = window.setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    }, [isPlaying]);

    useEffect(() => {
        const handleMouseMove = () => resetControlsTimeout();
        const handleKeyDown = (e: KeyboardEvent) => {
            resetControlsTimeout();
            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    setIsPlaying(p => !p);
                    break;
                case 'm':
                    setIsMuted(m => !m);
                    break;
                case 'f':
                    toggleFullscreen();
                    break;
                case 'ArrowLeft':
                    setProgress(p => Math.max(0, p - 10));
                    break;
                case 'ArrowRight':
                    setProgress(p => Math.min(100, p + 10));
                    break;
                case 'ArrowUp':
                    setVolume(v => Math.min(100, v + 10));
                    break;
                case 'ArrowDown':
                    setVolume(v => Math.max(0, v - 10));
                    break;
                case 'Escape':
                    if (isFullscreen) toggleFullscreen();
                    else navigate(-1);
                    break;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [resetControlsTimeout, isFullscreen, navigate]);

    // Simulate playback progress
    useEffect(() => {
        let interval: number;
        if (isPlaying) {
            interval = window.setInterval(() => {
                setProgress(p => {
                    const newProgress = Math.min(100, p + 0.1);
                    if (movie) {
                        updateProgress(movie.id, newProgress);
                    }
                    return newProgress;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, movie, updateProgress]);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleWatchlistToggle = () => {
        if (!movie) return;
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }
    };

    const formatTime = (percentage: number) => {
        // Assume 2 hour movie
        const totalMinutes = 120;
        const currentMinutes = Math.floor((percentage / 100) * totalMinutes);
        const hours = Math.floor(currentMinutes / 60);
        const minutes = currentMinutes % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    };

    if (!movie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-white mb-4">Content not found</h1>
                    <Link to="/explore" className="text-blue-500 hover:underline">
                        Browse content
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-black overflow-hidden cursor-none group"
            style={{ cursor: showControls ? 'default' : 'none' }}
            onClick={() => setIsPlaying(p => !p)}
            onMouseMove={resetControlsTimeout}
        >
            {/* Video Background (simulated with image) */}
            <img
                src={movie.backdrop}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Subtitles */}
            {showSubtitles && isPlaying && (
                <div className="absolute bottom-32 left-0 right-0 text-center animate-fade-in">
                    <p className="inline-block bg-black/70 text-white text-lg md:text-xl px-4 py-2 rounded">
                        [Dramatic music playing]
                    </p>
                </div>
            )}

            {/* Controls Overlay */}
            <div
                className={cn(
                    'absolute inset-0 transition-opacity duration-300',
                    showControls ? 'opacity-100' : 'opacity-0'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 to-transparent" />

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    aria-label="Go back"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                {/* Title */}
                <div className="absolute top-6 left-20 right-6">
                    <h1 className="text-xl md:text-2xl font-semibold text-white">{movie.title}</h1>
                    <p className="text-gray-400 text-sm">
                        {movie.type === 'series' ? 'S1:E1 "Pilot"' : movie.year}
                    </p>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!isPlaying && (
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center animate-scale-in">
                            <Play className="w-10 h-10 text-white fill-white ml-1" />
                        </div>
                    )}
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    {/* Progress Bar */}
                    <div className="group/progress">
                        <div
                            className="relative h-1 bg-gray-600 rounded-full cursor-pointer group-hover/progress:h-2 transition-all"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                setProgress((x / rect.width) * 100);
                            }}
                        >
                            {/* Buffered */}
                            <div className="absolute h-full bg-gray-500 rounded-full" style={{ width: `${progress + 20}%` }} />
                            {/* Progress */}
                            <div className="absolute h-full bg-[#E50914] rounded-full" style={{ width: `${progress}%` }} />
                            {/* Handle */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E50914] rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                                style={{ left: `calc(${progress}% - 8px)` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>{formatTime(progress)}</span>
                            <span>{movie.duration}</span>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={() => setIsPlaying(p => !p)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <Pause className="w-8 h-8 text-white" />
                                ) : (
                                    <Play className="w-8 h-8 text-white fill-white" />
                                )}
                            </button>

                            {/* Skip Back */}
                            <button
                                onClick={() => setProgress(p => Math.max(0, p - 10))}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Rewind 10 seconds"
                            >
                                <SkipBack className="w-6 h-6 text-white" />
                            </button>

                            {/* Skip Forward */}
                            <button
                                onClick={() => setProgress(p => Math.min(100, p + 10))}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Forward 10 seconds"
                            >
                                <SkipForward className="w-6 h-6 text-white" />
                            </button>

                            {/* Volume */}
                            <div
                                className="relative flex items-center"
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                <button
                                    onClick={() => setIsMuted(m => !m)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted || volume === 0 ? (
                                        <VolumeX className="w-6 h-6 text-white" />
                                    ) : (
                                        <Volume2 className="w-6 h-6 text-white" />
                                    )}
                                </button>
                                {showVolumeSlider && (
                                    <div className="absolute left-12 flex items-center gap-2 bg-black/80 px-3 py-2 rounded animate-fade-in">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={isMuted ? 0 : volume}
                                            onChange={(e) => {
                                                setVolume(Number(e.target.value));
                                                setIsMuted(false);
                                            }}
                                            className="w-24 accent-[#E50914]"
                                            aria-label="Volume"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Add to List */}
                            <button
                                onClick={handleWatchlistToggle}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label={inWatchlist ? 'Remove from My List' : 'Add to My List'}
                            >
                                {inWatchlist ? (
                                    <Check className="w-6 h-6 text-white" />
                                ) : (
                                    <Plus className="w-6 h-6 text-white" />
                                )}
                            </button>

                            {/* Like */}
                            <button
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Like"
                            >
                                <ThumbsUp className="w-6 h-6 text-white" />
                            </button>

                            {/* Share */}
                            <button
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Share"
                            >
                                <Share2 className="w-6 h-6 text-white" />
                            </button>

                            {/* Subtitles */}
                            <button
                                onClick={() => setShowSubtitles(s => !s)}
                                className={cn(
                                    'p-2 rounded-full transition-colors',
                                    showSubtitles ? 'bg-white/20' : 'hover:bg-white/10'
                                )}
                                aria-label="Toggle subtitles"
                                aria-pressed={showSubtitles}
                            >
                                <Subtitles className="w-6 h-6 text-white" />
                            </button>

                            {/* Settings */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSettingsMenu(s => !s)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Settings"
                                >
                                    <Settings className="w-6 h-6 text-white" />
                                </button>
                                {showSettingsMenu && (
                                    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg py-2 min-w-[200px] animate-scale-in">
                                        <div className="px-4 py-2 text-sm text-gray-400">Quality</div>
                                        {['Auto', '4K', '1080p', '720p'].map(q => (
                                            <button
                                                key={q}
                                                className="w-full px-4 py-2 text-left text-white hover:bg-white/10 flex items-center justify-between"
                                            >
                                                {q}
                                                {q === 'Auto' && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                        <div className="border-t border-gray-700 my-2" />
                                        <div className="px-4 py-2 text-sm text-gray-400">Speed</div>
                                        {['0.5x', '1x', '1.5x', '2x'].map(s => (
                                            <button
                                                key={s}
                                                className="w-full px-4 py-2 text-left text-white hover:bg-white/10 flex items-center justify-between"
                                            >
                                                {s}
                                                {s === '1x' && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-6 h-6 text-white" />
                                ) : (
                                    <Maximize className="w-6 h-6 text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skip Intro Button */}
            {progress > 5 && progress < 15 && (
                <button
                    onClick={() => setProgress(15)}
                    className="absolute bottom-36 right-6 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-6 py-2 rounded border border-white/50 transition-colors animate-fade-in"
                >
                    Skip Intro
                </button>
            )}
        </div>
    );
}
