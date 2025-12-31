import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types';

interface ContentRowProps {
    title: string;
    movies: Movie[];
    showNumbers?: boolean;
}

export function ContentRow({ title, movies, showNumbers = false }: ContentRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    if (!movies.length) return null;

    return (
        <section className="relative py-4 group/row" aria-label={title}>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-3 px-4 md:px-12">
                {title}
            </h2>

            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className={cn(
                        'absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-start pl-2 transition-opacity',
                        showLeftArrow ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0 pointer-events-none'
                    )}
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                {/* Content */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar px-4 md:px-12"
                >
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            index={index}
                            showNumber={showNumbers}
                        />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className={cn(
                        'absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-end pr-2 transition-opacity',
                        showRightArrow ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0 pointer-events-none'
                    )}
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </button>
            </div>
        </section>
    );
}
