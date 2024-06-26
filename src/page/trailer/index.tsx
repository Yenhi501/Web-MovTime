import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import { IconWithText } from '../../component/icon-with-text';
import { ActorFamous } from '../../component/list-actor-famous';
import { ListEpisodes } from '../../component/list-episode';
import { ListFilm } from '../../component/list-film';
import { MainInfoFilm } from '../../component/main-info-film';
import { SubInfo } from '../../component/sub-info';
import { VideoPlayerCustom } from '../../component/video-player-custom';
import { useToken } from '../../hooks/useToken';
import { DAFilm, Film, Genres } from '../../model/film';
import { request } from '../../utils/request';
import { defaultFilm} from './default-value';
import './index.scss';
import { selectionItems } from './items-selection';
import { t } from '../../utils/i18n';
import { useParams } from 'react-router-dom';

const moment = require('moment');

export const TrailerPage = () => {
    const { accessToken } = useToken();
    const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
    const [rating, setRating] = useState(0);
    const { movieId, episodeId } = useParams();
    const [combinedActorsAndDirectors, setCombinedActorsAndDirectors] = useState<Array<DAFilm>>([]);
    const [subInfo, setSubInfo] = useState<Array<SubInfo>>([]);
    const [listHashtag, setListHashtag] = useState<string[]>([]);
    const [dataRecommend, setRecommened] = useState<Film[]>([]);
    const fetchData = async () => {
        
        try {
            const response = await request.get(`movies/${movieId}`);
            const data = response.data;

            setWatchingData(data.movie);
            setRating(data.rating);
            const dataMovieHandler = {
                ...data.movie,
                releaseDate: moment(data.movie).format('YYYY'),
            };
            setListHashtag([
                ...data.movie.genres.map((genre: Genres) => genre.name),
                dataMovieHandler.releaseDate,
                'HD',
            ]);
            setWatchingData(dataMovieHandler);
            setRating(data.rating);
        } catch (error) {
            console.error(error);
        }
    };
console.log(watchingData);
    useEffect(() => {
        fetchData();
        fetchRecommend();
    }, [movieId, accessToken]);

    const fetchRecommend = async () => {
        try {
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await request.get('movies/recommend/get?page=1&pageSize=20', {
                headers,
            });
            setRecommened(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    

    useEffect(() => {
        // window.scrollTo(0, 0);
    }, [episodeId]);

  
    return (
        <div className="watching-container">

            <div className="watching ">
                <div className="watching-player-container flex-1 bg-zinc-800 relative ">
                    <VideoPlayerCustom
                        sourceUrl={watchingData.trailerURL}
                        watchingVideoId={watchingData.movieId}
                    />
                </div>
                <div className="watching-list-film-container">
                    <ListEpisodes
                        title={t('Listofepisodes')}
                        subInfo={[
                            `16/${watchingData?.episodeNum}`,
                            `${t('Broadcastat8pmeverySaturday')}`,
                        ]}
                        sessions={selectionItems}
                        multiSessions={false}
                        titleFilm={watchingData?.title}
                        listEpisodes={watchingData?.episodes}
                        watchingData={watchingData}
                    />
                    
                </div>
            </div>
            <div className="watching-info-container !mb-[-60px]">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name={watchingData?.title}
                    rate={watchingData?.averageRating}
                    hashtag={listHashtag}
                    desc={watchingData?.description}
                    episode={"Trailer"}
                    movieId={parseInt(movieId ?? '0')}
                    rating={rating}
                    level={watchingData?.level}
                />

                <div className="watching-sub-info-container">
                    <div className="watching-feature">
                        <IconWithText
                            icon={<CommentOutlined className="watching-feature-icon" />}
                            text={t('Comment')}
                            scrollToSectionId="comment"
                        />

                        <FacebookShareButton
                            url={`https://web-mov-time.vercel.app/movie/${movieId}/${episodeId}`}
                        >
                            <IconWithText
                                icon={<ShareAltOutlined className="watching-feature-icon" />}
                                text={t('Share')}
                            />
                        </FacebookShareButton>
                    </div>
                    <div className="watching-sub-info">
                        {subInfo.map((value) => (
                            <SubInfo
                                title={value.title}
                                content={value.content}
                                className="watching-sub-info-item"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ActorFamous DAlist={combinedActorsAndDirectors} size={130} isShow={true} />
            <ListFilm title={t('YouLike')} listFilm={dataRecommend} isShow={false} />
            
        </div>
    );
};
