import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FacebookShareButton } from 'react-share';
import { Comment } from '../../component/comment';
import { IconWithText } from '../../component/icon-with-text';
import { ActorFamous } from '../../component/list-actor-famous';
import { ListEpisodes } from '../../component/list-episode';
import { ListFilm } from '../../component/list-film';
import { MainInfoFilm } from '../../component/main-info-film';
import { SubInfo } from '../../component/sub-info';
import { VideoPlayerCustom } from '../../component/video-player-custom';
import { useToken } from '../../hooks/useToken';
import { DAFilm, Episode, Film, Genres } from '../../model/film';
import { NotifyModalContent, defaultNotifyModalContent } from '../../model/notify-modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setDurationDefault, setEpisodeId } from '../../redux/videoSlice';
import { request } from '../../utils/request';
import { defaultEpisode, defaultFilm, modalContentMap } from './default-value';
import './index.scss';
import { selectionItems } from './items-selection';
import { t } from '../../utils/i18n';

const moment = require('moment');

export const WatchingPage = () => {
    const { accessToken } = useToken();
    const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
    const [rating, setRating] = useState(0);
    const { movieId, episodeId } = useParams();
    const [combinedActorsAndDirectors, setCombinedActorsAndDirectors] = useState<Array<DAFilm>>([]);
    const [subInfo, setSubInfo] = useState<Array<SubInfo>>([]);
    const [listHashtag, setListHashtag] = useState<string[]>([]);
    const [openModalNotify, setOpenModalNotify] = useState(false);
    const [openModalVIP, setOpenModalVIP] = useState(false);
    const [contentModal, setContentModal] = useState<NotifyModalContent>(defaultNotifyModalContent);
    const navigator = useNavigate();
    const [dataRecommend, setRecommened] = useState<Film[]>([]);
    const dispatch = useAppDispatch();
    const durationDefault = useAppSelector((state) => state.videoWatching.durationDefault);
    const [srcVideo, setSrcVideo] = useState('');

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

    useEffect(() => {
        fetchData();
        fetchRecommend();
    }, [movieId, accessToken]);

    //api từng tập
    const [dataEpisode, setDataEpisode] = useState<Episode>(defaultEpisode);
    const { pathname } = useLocation();

    const getDataEpisode = () => {
        dispatch(setEpisodeId(pathname.split('/')[3]));
        request
            .get(`/episode/${pathname.split('/')[3]}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSrcVideo(res.data.episode.movieURL);
                setDataEpisode(res.data.episode);
                dispatch(setDurationDefault(res.data.watchHistory.duration));
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    setOpenModalNotify(true);
                    const dataNotifyModal = modalContentMap[handleNotify()];
                    setContentModal(dataNotifyModal);
                    console.log(err.response);
                }
                if (err.response?.status === 403) {
                    setOpenModalVIP(true);
                    
                }
            });
    };

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
    //share

    useEffect(() => {
        if (watchingData != null) {
            const listDA: DAFilm[] = [
                ...watchingData?.actors,
                ...watchingData?.directors,
            ] as DAFilm[];

            setCombinedActorsAndDirectors(listDA);

            setSubInfo([
                {
                    title: `${t('Actor')}`,
                    content: watchingData?.actors
                        .map((actor) => actor.name.concat(', '))
                        .concat('...') || [''],
                },
                {
                    title: `${t('Category')}`,
                    content: watchingData?.genres.map((actor) => actor.name.concat(', ')) || [''],
                },
            ]);
            getDataEpisode();
        }
    }, [watchingData, pathname]);

    useEffect(() => {
        // window.scrollTo(0, 0);
    }, [episodeId]);

    const handleNotify = () => {
        if (accessToken !== '' || accessToken != null) {
            return 'login';
        } else {
            return 'upgradePackage';
        }
    };
    return (
        <div className="watching-container">
            <Modal
                title={`${t('Nothaveaccess')}`}
                open={openModalNotify}
                onCancel={() => {
                    navigator({ pathname: '/' });
                }}
                onOk={() => {
                    navigator({
                        pathname: contentModal.linkDirect,
                        hash: watchingData.movieId.toString(),
                    });
                }}
                okText={contentModal.btn}
                cancelText= {t('Onthehomepage')}
            >
                {contentModal.content}
            </Modal>
            <Modal
                title={'Không có quyền truy cập'}
                open={openModalVIP}
                onCancel={() => {
                    navigator({ pathname: '/' });
                }}
                onOk={() => {
                    navigator({
                        pathname: '/VIPPackage',
                    });
                }}
                okText={'Đăng ký gói'}
                cancelText= {t('Onthehomepage')}
            >
                Mua gói VIP  để có thể xem được nhiều phim hơn
            </Modal>

            <div className="watching ">
                <div className="watching-player-container flex-1 bg-zinc-800 relative ">
                    <VideoPlayerCustom
                        sourceUrl={srcVideo}
                        episodeId={dataEpisode.episodeId}
                        setSrcVideo={setSrcVideo}
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
                    {/* <ListFilm title="Phim liên quan" listFilm={watchingData} /> */}
                </div>
            </div>
            <div className="watching-info-container !mb-[-60px]">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name={watchingData?.title}
                    rate={watchingData?.averageRating}
                    hashtag={listHashtag}
                    desc={watchingData?.description}
                    view={dataEpisode?.numView}
                    episode={`${dataEpisode?.title}`}
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
            <div className="comment-container" id="comment">
                <Comment title={t('Comment')} placeholder={t('CommentHere')}/>
            </div>
        </div>
    );
};
