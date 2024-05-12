import './index.scss';

interface Episodes {
    episodeId?: number;
    movieId?: number;
    episodeTitle: string;
    releaseDate?: string;
    posterUrl?: string;
    movieUrl?: string;
    numView?: string;
    duration: number;
    episodeNo?: number;
    titleFilm?: string;
}
export const EpisodeItem = ({
    episodeTitle,
    releaseDate,
    numView,
    posterUrl,
    duration,
}: Episodes) => {
    return (
        <div className="episodes-item-container">
            <div className="episodes-item-info">
                <h1 className="episodes-item-title">{episodeTitle}</h1>
                <h5 className="episodes-item-duration">
                    {'•'} {duration} {' phút'}
                </h5>
                <p className="episodes-item-sub-info">
                    {/* {releaseDate}  */}
                    {numView}
                    {' lượt xem'}
                </p>
            </div>
            <img src={posterUrl} alt="" className="episodes-item-image" />
        </div>
    );
};
