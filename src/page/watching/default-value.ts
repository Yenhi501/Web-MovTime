import { NotifyModalContent } from '../../model/notify-modal';

export const defaultEpisode = {
    description: '',
    duration: 0,
    episodeId: 0,
    episodeNo: 0,
    movieId: 0,
    movieURL: '',
    numView: '',
    posterURL: '',
    title: '',
};

export const defaultEpisodeFilm = {
    duration: 0,
    episode_id: 0,
    episode_no: 0,
    movie_id: 0,
    num_view: '',
    poster_url: '',
    release_date: '',
    title: '',
};

export const defaultFilm = {
    movieId: 0,
    title: '',
    description: '',
    releaseDate: '',
    nation: '',
    posterURL: '',
    trailerURL: '',
    averageRating: '',
    episodeNum: 0,
    level: 0,
    genres: [],
    actors: [],
    episodes: [defaultEpisodeFilm],
    directors: [],
};

export const modalContentMap: Record<string, NotifyModalContent> = {
    login: {
        content: 'Vui lòng đăng nhập để xem phim',
        btn: 'Đăng nhập',
        linkDirect: '/login',
    },
    upgradePackage: {
        content: 'Vui lòng nâng cấp gói thành viên để xem phim',
        btn: 'Nâng cấp gói',
        linkDirect: '/VIPpackage',
    },
};
