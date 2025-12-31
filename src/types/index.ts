export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    createdAt: Date;
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    backdrop: string;
    year: number;
    duration: string;
    rating: number;
    maturityRating: string;
    genres: string[];
    cast: string[];
    director: string;
    type: 'movie' | 'series';
    seasons?: number;
    episodes?: Episode[];
}

export interface Episode {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    seasonNumber: number;
    episodeNumber: number;
}

export interface WatchlistItem {
    id: string;
    movieId: string;
    addedAt: Date;
}

export interface ContinueWatching {
    id: string;
    movieId: string;
    progress: number; // percentage 0-100
    lastWatched: Date;
}

export interface Profile {
    id: string;
    name: string;
    avatar: string;
    isKid: boolean;
    maturityRating: string;
}

export interface Settings {
    playbackQuality: 'auto' | '720p' | '1080p' | '4k';
    autoplayNext: boolean;
    autoplayPreviews: boolean;
    subtitlesEnabled: boolean;
    subtitleLanguage: string;
    audioLanguage: string;
    notifications: {
        newReleases: boolean;
        recommendations: boolean;
        accountUpdates: boolean;
    };
}
