import { NotifyModalContent } from '../../model/notify-modal';
import { t } from '../../utils/i18n';

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
        content: `${t("loginToWatchMovie")}`,
        btn: `${t("Login")}`,
        linkDirect: '/login',
    },
    upgradePackage: {
        content: `${t("PleaseUpgrade")}`,
        btn: `${t("Upgrade")}`,
        linkDirect: '/VIPpackage',
    },
};
