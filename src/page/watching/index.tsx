import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Comment } from '../../component/comment';
import { IconWithText } from '../../component/icon-with-text';
import { ListEpisodes } from '../../component/list-episode';
import { MainInfoFilm } from '../../component/main-info-film';
import { SubInfo } from '../../component/sub-info';
import { DAFilm, Episode, Film, Genres } from '../../model/film';
import { request } from '../../utils/request';
import { Modal } from 'antd';
import { FacebookShareButton } from 'react-share';
import { ActorFamous } from '../../component/list-actor-famous';
import { ListFilm } from '../../component/list-film';
import { VideoPlayerCustom } from '../../component/video-player-custom';
import { useToken } from '../../hooks/useToken';
import { NotifyModalContent, defaultNotifyModalContent } from '../../model/notify-modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { selectionItems } from './items-selection';
import { setDataVideoWatching, setDurationDefault, setEpisodeId } from '../../redux/videoSlice';
import { defaultEpisode, defaultFilm, modalContentMap } from './default-value';
import './index.scss';

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
                    title: 'Diễn viên',
                    content: watchingData?.actors
                        .map((actor) => actor.name.concat(', '))
                        .concat('...') || [''],
                },
                {
                    title: 'Thể loại',
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
                title={'Không có quyền truy cập'}
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
                cancelText="Về trang chủ"
            >
                {contentModal.content}
            </Modal>

            <div className="watching ">
                <div className="watching-player-container flex-1 bg-zinc-800 relative h-fit">
                    <VideoPlayerCustom
                        sourceUrl={srcVideo}
                        episodeId={dataEpisode.episodeId}
                        setSrcVideo={setSrcVideo}
                        watchingVideoId={watchingData.movieId}
                    />
                </div>
                <div className="watching-list-film-container">
                    <ListEpisodes
                        title="Danh sách tập"
                        subInfo={[
                            `16/${watchingData?.episodeNum}`,
                            'Phát sóng lúc 20h thứ 7 hàng tuần',
                        ]}
                        sessions={selectionItems}
                        multiSessions={false}
                        titleFilm={watchingData?.title}
                        listEpisodes={watchingData?.episodes}
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
                            text="Bình luận"
                            scrollToSectionId="comment"
                        />

                        <FacebookShareButton
                            url={`http://movetimes.tech/movie/${movieId}/${episodeId}`}
                        >
                            <IconWithText
                                icon={<ShareAltOutlined className="watching-feature-icon" />}
                                text="Chia sẻ"
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
            <ListFilm title="Có thể bạn sẽ thích" listFilm={dataRecommend} isShow={false} />
            <div className="comment-container" id="comment">
                <Comment title="Bình luận phim" placeholder="Bình luận về phim ở đây" />
            </div>
        </div>
    );
};
