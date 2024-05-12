export interface Genres {
    genre_id: number;
    name: string;
}

export interface Actors {
    actor_id: number;
    name: string;
    avatar: string;
    actorId?:number;
}

export interface Directors {
    director_id: number;
    name: string;
    avatar: string;
}

export interface EpisodeFilm {
    duration: number;
    episode_id: number;
    episode_no: number;
    movie_id: number;
    num_view: string;
    poster_url: string;
    release_date: string;
    title: string;
}

export type Film = {
    movieId: number;
    title: string;
    description: string;
    releaseDate: string;
    nation: string;
    posterURL: string;
    trailerURL: string;
    averageRating: string;
    episodeNum: number;
    backgroundURL?: string;
    level: number;
    genres: Array<Genres>;
    actors: Array<Actors>;
    episodes: Array<EpisodeFilm>;
    rating?: number;
    directors: Array<Directors>;
};

export interface Episode {
    description: string;
    duration: number;
    episodeId: number;
    episodeNo: number;
    movieId: number;
    movieURL: string;
    numView: string;
    posterURL: string;
    title: string;
}

export interface DAFilm extends Actors, Directors {}
