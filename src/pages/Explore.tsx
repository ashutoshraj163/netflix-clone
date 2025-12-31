import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ContentRow } from '@/components/ContentRow';
import { Footer } from '@/components/Footer';
import { mockMovies, getTrendingMovies, getTopRated, getNewReleases, getMoviesByGenre, getAllGenres } from '@/data/mockData';
import { useWatchlist } from '@/context/WatchlistContext';

export function Explore() {
    const [searchParams] = useSearchParams();
    const typeFilter = searchParams.get('type');
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const { getContinueWatchingMovies } = useWatchlist();

    const filteredMovies = useMemo(() => {
        let movies = mockMovies;
        if (typeFilter) {
            movies = movies.filter(m => m.type === typeFilter);
        }
        if (selectedGenre) {
            movies = movies.filter(m => m.genres.includes(selectedGenre));
        }
        return movies;
    }, [typeFilter, selectedGenre]);

    const featuredMovie = filteredMovies[0] || mockMovies[0];
    const continueWatching = getContinueWatchingMovies()
        .map(item => item.movie)
        .filter(Boolean);
    const trending = getTrendingMovies();
    const topRated = getTopRated();
    const newReleases = getNewReleases();
    const genres = getAllGenres();

    // Get movies by different genres
    const sciFiMovies = getMoviesByGenre('Sci-Fi');
    const actionMovies = getMoviesByGenre('Action');
    const dramaMovies = getMoviesByGenre('Drama');

    return (
        <div className="min-h-screen bg-[#141414] relative overflow-x-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-black z-0" />

            <div className="relative z-10">
                <Navbar />

                {/* Hero */}
                <HeroSection movie={featuredMovie} />

                {/* Genre Filter */}
                <div className="px-4 md:px-12 py-10 flex gap-3 overflow-x-auto hide-scrollbar relative z-20 -mt-6 mb-2">
                    <button
                        onClick={() => setSelectedGenre(null)}
                        className={`genre-pill ${!selectedGenre
                            ? 'genre-pill-active'
                            : 'glass-card text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                    >
                        All Genres
                    </button>
                    {genres.map(genre => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`genre-pill ${selectedGenre === genre
                                ? 'genre-pill-active'
                                : 'glass-card text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                {/* Content Rows */}
                <div className="pb-16 -mt-16 relative z-10 space-y-2">
                    {continueWatching.length > 0 && (
                        <ContentRow
                            title="Continue Watching"
                            movies={continueWatching as typeof mockMovies}
                        />
                    )}

                    <ContentRow
                        title="Trending Now"
                        movies={selectedGenre ? filteredMovies : trending}
                    />

                    <ContentRow
                        title="Top 10 in Your Country"
                        movies={topRated}
                        showNumbers
                    />

                    <ContentRow
                        title="New Releases"
                        movies={newReleases}
                    />

                    {!selectedGenre && (
                        <>
                            <ContentRow
                                title="Sci-Fi Adventures"
                                movies={sciFiMovies}
                            />

                            <ContentRow
                                title="Action & Thrillers"
                                movies={actionMovies}
                            />

                            <ContentRow
                                title="Critically Acclaimed Dramas"
                                movies={dramaMovies}
                            />
                        </>
                    )}

                    <ContentRow
                        title="Browse All"
                        movies={filteredMovies}
                    />
                </div>

                <Footer />
            </div>
        </div>
    );
}
