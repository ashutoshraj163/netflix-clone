import type { Movie, Profile, Settings, WatchlistItem, ContinueWatching } from '@/types';

export const mockProfiles: Profile[] = [
    { id: '1', name: 'User', avatar: '🎬', isKid: false, maturityRating: 'R' },
    { id: '2', name: 'Kids', avatar: '👶', isKid: true, maturityRating: 'PG' },
];

export const mockSettings: Settings = {
    playbackQuality: 'auto',
    autoplayNext: true,
    autoplayPreviews: true,
    subtitlesEnabled: false,
    subtitleLanguage: 'en',
    audioLanguage: 'en',
    notifications: {
        newReleases: true,
        recommendations: true,
        accountUpdates: true,
    },
};

export const mockMovies: Movie[] = [
    {
        id: '1',
        title: 'Cosmic Odyssey',
        description: 'An epic journey through space and time as humanity reaches for the stars. When a mysterious signal is detected from a distant galaxy, a team of astronauts embarks on the mission of a lifetime.',
        thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '2h 28m',
        rating: 8.7,
        maturityRating: 'PG-13',
        genres: ['Sci-Fi', 'Adventure', 'Drama'],
        cast: ['Emma Stone', 'Ryan Gosling', 'Chadwick Boseman'],
        director: 'Denis Villeneuve',
        type: 'movie',
    },
    {
        id: '2',
        title: 'The Last Kingdom',
        description: 'In a world divided by war, one warrior must unite the realms or watch them fall to darkness. An epic tale of honor, sacrifice, and the fight for what is right.',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        year: 2023,
        duration: '2h 15m',
        rating: 8.4,
        maturityRating: 'R',
        genres: ['Fantasy', 'Action', 'Drama'],
        cast: ['Chris Hemsworth', 'Gal Gadot', 'Tom Hardy'],
        director: 'Patty Jenkins',
        type: 'movie',
    },
    {
        id: '3',
        title: 'Neon Nights',
        description: 'In the rain-soaked streets of a cyberpunk metropolis, a detective with a troubled past hunts a killer that may not be human.',
        thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '1h 58m',
        rating: 8.2,
        maturityRating: 'R',
        genres: ['Sci-Fi', 'Thriller', 'Mystery'],
        cast: ['Keanu Reeves', 'Ana de Armas', 'Jared Leto'],
        director: 'David Fincher',
        type: 'movie',
    },
    {
        id: '4',
        title: 'Echoes of Tomorrow',
        description: 'A mind-bending thriller about a scientist who discovers a way to see into the future, only to realize some things are better left unknown.',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '2h 05m',
        rating: 8.9,
        maturityRating: 'PG-13',
        genres: ['Sci-Fi', 'Thriller', 'Drama'],
        cast: ['Oscar Isaac', 'Jessica Chastain', 'Michael B. Jordan'],
        director: 'Christopher Nolan',
        type: 'movie',
    },
    {
        id: '5',
        title: 'The Deep Blue',
        description: 'When a submarine crew discovers an ancient underwater civilization, they must decide whether to protect or exploit their incredible find.',
        thumbnail: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop',
        year: 2023,
        duration: '2h 20m',
        rating: 7.8,
        maturityRating: 'PG-13',
        genres: ['Adventure', 'Sci-Fi', 'Mystery'],
        cast: ['Jason Momoa', 'Zendaya', 'John Boyega'],
        director: 'James Cameron',
        type: 'movie',
    },
    {
        id: '6',
        title: 'Shadows of the Past',
        description: 'A former spy is pulled back into the dangerous world she left behind when ghosts from her past threaten everything she loves.',
        thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '2h 10m',
        rating: 8.1,
        maturityRating: 'R',
        genres: ['Action', 'Thriller', 'Drama'],
        cast: ['Charlize Theron', 'Idris Elba', 'Henry Cavill'],
        director: 'Gina Prince-Bythewood',
        type: 'movie',
    },
    {
        id: '7',
        title: 'The Wanderer',
        description: 'An epic series following a lone traveler across a post-apocalyptic landscape in search of a mythical sanctuary.',
        thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '5 Seasons',
        rating: 9.1,
        maturityRating: 'TV-MA',
        genres: ['Drama', 'Sci-Fi', 'Adventure'],
        cast: ['Pedro Pascal', 'Bella Ramsey', 'Nick Offerman'],
        director: 'Craig Mazin',
        type: 'series',
        seasons: 5,
    },
    {
        id: '8',
        title: 'Crown of Thorns',
        description: 'A gripping political drama set in a fictional European monarchy, where every alliance comes with a price.',
        thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
        year: 2023,
        duration: '3 Seasons',
        rating: 8.6,
        maturityRating: 'TV-14',
        genres: ['Drama', 'Thriller', 'History'],
        cast: ['Claire Foy', 'Matt Smith', 'Olivia Colman'],
        director: 'Peter Morgan',
        type: 'series',
        seasons: 3,
    },
    {
        id: '9',
        title: 'Digital Frontier',
        description: 'In a world where reality and virtual worlds blur, a group of hackers discovers a conspiracy that could end civilization.',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '2 Seasons',
        rating: 8.3,
        maturityRating: 'TV-MA',
        genres: ['Sci-Fi', 'Thriller', 'Action'],
        cast: ['Elliot Page', 'Jenna Ortega', 'Timothée Chalamet'],
        director: 'Lana Wachowski',
        type: 'series',
        seasons: 2,
    },
    {
        id: '10',
        title: 'Mountain Rising',
        description: 'A breathtaking documentary series exploring the world\'s most magnificent mountain ranges and the communities that call them home.',
        thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop',
        year: 2024,
        duration: '1 Season',
        rating: 9.3,
        maturityRating: 'TV-G',
        genres: ['Documentary', 'Nature', 'Adventure'],
        cast: ['David Attenborough'],
        director: 'Alastair Fothergill',
        type: 'series',
        seasons: 1,
    },
];

export const mockWatchlist: WatchlistItem[] = [
    { id: '1', movieId: '1', addedAt: new Date('2024-01-15') },
    { id: '2', movieId: '4', addedAt: new Date('2024-01-18') },
    { id: '3', movieId: '7', addedAt: new Date('2024-01-20') },
];

export const mockContinueWatching: ContinueWatching[] = [
    { id: '1', movieId: '2', progress: 45, lastWatched: new Date('2024-01-21') },
    { id: '2', movieId: '8', progress: 72, lastWatched: new Date('2024-01-20') },
    { id: '3', movieId: '3', progress: 23, lastWatched: new Date('2024-01-19') },
];

export const getMovieById = (id: string): Movie | undefined => {
    return mockMovies.find(movie => movie.id === id);
};

export const getMoviesByIds = (ids: string[]): Movie[] => {
    return mockMovies.filter(movie => ids.includes(movie.id));
};

export const getMoviesByGenre = (genre: string): Movie[] => {
    return mockMovies.filter(movie => movie.genres.includes(genre));
};

export const getTrendingMovies = (): Movie[] => {
    return mockMovies.slice(0, 6);
};

export const getTopRated = (): Movie[] => {
    return [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 6);
};

export const getNewReleases = (): Movie[] => {
    return mockMovies.filter(movie => movie.year === 2024);
};

export const getAllGenres = (): string[] => {
    const genres = new Set<string>();
    mockMovies.forEach(movie => movie.genres.forEach(genre => genres.add(genre)));
    return Array.from(genres).sort();
};
