export interface Movie {
    movieId: number;
    backgroundURL: string;
    title: string;
    releaseDate: string;
    averageRating: number;
    description: string;
    episodeNum: string;
    genres: Array<Genres>;
}
export interface Genres {
    genre_id: number;
    name: string;
}