import {
    CaretRightOutlined,
    CheckOutlined,
    HeartFilled,
    HeartOutlined,
    PlusOutlined,
    ShareAltOutlined,
    SmallDashOutlined,
    StarFilled,
} from '@ant-design/icons';
import { Spin, message, notification } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { endpoint } from '../../utils/baseUrl';
import { t } from '../../utils/i18n';
import { request } from '../../utils/request';
import { FilmItem } from '../film-item';
import FilmDetailsSection from './film-detail-section';
import { FilmDetailTab } from './film-detail-tab';
import './index.scss';
import ShareModal from './share';
import { getCurrentLanguage } from '../../utils/localization';
import { genreTranslationMap } from '../header/constant';

interface Genre {
    id: number;
    name: string;
}

export const FilmDetail = () => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const { id } = useParams<{ id: string }>();
    const [filmDetail, setFilmDetail] = useState<any>(null);
    const [addedToCollection, setAddedToCollection] = useState<boolean>(false);
    const [addedToLove, setAddedToLove] = useState<boolean>(false);
    const [dataLove, setDataLove] = useState<FilmItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCodeUrl] = useState<string | null>(null);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    let firstEpisodeId: number | null = null;

    // const updateOgTags = (filmDetail: FilmItem, isMoviePage: boolean = false) => {
    //     const movieId = filmDetail?.movieId;
    //     const title = filmDetail.title || '';
    //     const description = filmDetail.description?.slice(0, 100) + '...' || '';
    //     const posterURL = filmDetail.posterURL || '';
    //     const url = isMoviePage
    //         ? `${window.location.origin}/movie/${movieId}`
    //         : `${window.location.origin}`;

    //     return (
    //         <Helmet>
    //             <title>{title}</title>
    //             <meta property="og:type" content="website" />
    //             <meta property="og:title" content={title} />
    //             <meta property="og:description" content={description} />
    //             <meta property="og:image" content={posterURL} />
    //             <meta property="og:url" content={url} />
    //             <meta property="og:image:width" content="1200" />
    //             <meta property="og:image:height" content="630" />
    //         </Helmet>
    //     );
    // };

    // check watch later
    const [dataCollect, setDataCollect] = useState<FilmItem[]>([]);
    const handleUnauthorizedAction = () => {
        notification.warning({
            message: t('Notification'),
            description: t('PleaseLogInToPerformThisAction.'),
        });
    };

    const handleShare = async () => {
        if (isUserLoggedIn) {
            const movieId = filmDetail?.movieId;
            const actorLink = encodeURIComponent(`${window.location.origin}/movie/${movieId}`);

            try {
                const response = await fetch(`${endpoint}/api/movies/get/qrcode?url=${actorLink}`);

                if (response.ok) {
                    const data = await response.json();
                    setQrCodeUrl(data.qrCode);
                    if (typeof data.qrCode === 'string') {
                        const regex = /(data:image\/png;base64,[^'"]+)/;
                        const match = data.qrCode.match(regex);

                        if (match) {
                            const base64Value = match[1];
                            setQrCodeUrl(base64Value || '');
                        }
                    }

                    setCopiedLink(`${window.location.origin}/movie/${movieId}`);

                    setShareModalVisible(true);
                } else {
                    console.error('Failed to fetch QR code URL');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleCopyLink = () => {
        if (copiedLink) {
            navigator.clipboard.writeText(copiedLink);
            message.success(t('CopySuccessful'));
        }
    };

    const fetchWatchLaterList = async () => {
        try {
            const response = await request.get('user/get-watch-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataCollect(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFilmDetailsInCollections = (data: FilmItem, dataCollect: FilmItem[]) => {
        if (data && data.movieId) {
            const isFilmDetailInWatchLater = dataCollect.some(
                (item: FilmItem) => item.id === data.movieId,
            );
            setAddedToCollection(isFilmDetailInWatchLater);
        }
    };

    const fetchData = async () => {
        try {
            const movieData = await fetch(`${endpoint}/api/movies/${id}`).then((res) => res.json());
            setFilmDetail(movieData.movie);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataAndWatchLaterList = async () => {
        checkFilmDetailsInCollections(filmDetail, dataCollect);
    };
    //check lovemovie
    const fetchLoveList = async () => {
        try {
            const response = await request.get('user/get-favorite-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataLove(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFilmDetailsInLove = (data: FilmItem, dataLove: FilmItem[]) => {
        if (data && data.movieId) {
            const isFilmDetailInLove = dataLove.some((item: FilmItem) => item.id === data.movieId);
            setAddedToLove(isFilmDetailInLove);
        }
    };

    const fetchDataAndLoveList = async () => {
        checkFilmDetailsInLove(filmDetail, dataLove);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchWatchLaterList();
    }, [addedToCollection]);

    useEffect(() => {
        fetchLoveList();
    }, [addedToLove]);

    useEffect(() => {
        fetchDataAndWatchLaterList();
        fetchDataAndLoveList();
    }, [isUserLoggedIn, id, filmDetail, dataCollect, dataLove]);
    if (!filmDetail) {
        return <Spin spinning={loading} size="large" className="mt-96" />;
    }

    if (filmDetail.episodes && filmDetail.episodes.length > 0) {
        const firstEpisode = filmDetail.episodes[0];
        firstEpisodeId = firstEpisode.episode_id;
    }

    //api add bộ sưu tập
    const handleAddToCollection = async () => {
        if (!isUserLoggedIn) {
            handleShare();
        }
        if (filmDetail && filmDetail.movieId) {
            const isFilmDetailInWatchLater = dataCollect.some(
                (item: FilmItem) => item.id === filmDetail.movieId,
            );
            if (!isFilmDetailInWatchLater) {
                try {
                    const response = await request.get(`user/add-watch-list?movieId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.data.status === 'Ok!') {
                        setAddedToCollection(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            if (isFilmDetailInWatchLater) {
                try {
                    const response = await request.delete(`user/delete-watch-list?movieId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.data.status === 'Ok!') {
                        setAddedToCollection(false);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
    //api love movie
    const handleAddToLove = async () => {
        if (!isUserLoggedIn) {
            handleShare();
        }
        if (filmDetail && filmDetail.movieId) {
            const isFilmDetailInLove = dataLove.some(
                (item: FilmItem) => item.id === filmDetail.movieId,
            );
            if (!isFilmDetailInLove) {
                try {
                    const response = await request.get(`user/add-favorite-movie?movieId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.data.status === 'Ok!') {
                        setAddedToLove(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            if (isFilmDetailInLove) {
                try {
                    const response = await request.delete(
                        `user/delete-favorite-movie?movieId=${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );
                    if (response.data.status === 'Ok!') {
                        setAddedToLove(false);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    return (
        <div className="film-detail flex-grow mb-[300px]">
            <div
                style={{
                    position: 'relative',
                }}
                className="bg-center bg-no-repeat md:h-[400px] h-[300px] relative"
            >
                <div
                    style={{
                        backgroundImage: `url(${filmDetail.backgroundURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        objectFit: 'contain',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                />

                <div className="bg-gradient-to-br from-transparent h-full ">
                    <div className="flex flex-col md:flex-row bottom-[-85%] md:bottom-[20%] items-start tw-absolute-center-horizontal">
                        <div className="film-detail__name flex gap-10 items-center">
                            <img
                                className="film-detail__poster"
                                src={filmDetail.posterURL}
                                alt="poster"
                            />
                            <div
                                className="film-detail__title"
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {filmDetail.title}
                            </div>
                        </div>
                        <div className="film-detail__header mb-6">
                            <div className="film-detail__info">
                                <div className="film-detail__summary flex">
                                    {filmDetail.genres.slice(0, 4).map((genre: Genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-2 film-detail__padding"
                                        >
                                            {genreTranslationMap[getCurrentLanguage()]?.[genre.name] || genre.name}
                                        </span>
                                    ))}
                                    <span className="flex gap-1 items-center justify-center px-8 py-2 film-detail__padding ">
                                        <StarFilled style={{ color: '#fadb14', fontSize: 16 }} />
                                        <p> {filmDetail.averageRating}</p>
                                    </span>
                                    {filmDetail.level === 1 ? (
                                        <span className="px-4 py-2 film-detail__padding !bg-[#fadb14] !text-white">
                                            VIP
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <div className="film-detail__listbutton">
                                    <Link
                                        to={`/movie/trailer/${filmDetail.movieId}`}
                                        className="film-detail__watch flex items-center pl-3 pr-4 py-[6px] rounded-[6px] text-whitetransition duration-300 mt-[-10px] mr-3"
                                    >
                                        <CaretRightOutlined />
                                        <span className="ml-2 text-[1rem]">{t('PlayNow')}</span>
                                    </Link>
                                

                                    <div
                                        className="film-detail__watch flex items-center pl-3 pr-4 py-[6px] rounded-[6px] text-whitetransition duration-300 mt-[-10px] mr-2 hover:cursor-pointer"
                                        onClick={handleAddToCollection}
                                    >
                                        {addedToCollection ? <CheckOutlined /> : <PlusOutlined />}
                                        <span className="ml-2 text-[1rem]">{t('WatchLater')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 absolute top-[83%] right-[8%]">
                        <a
                            className="h-10 w-10 rounded-full border-[1.5px] border-white hover:cursor-pointer"
                            onClick={handleAddToLove}
                        >
                            {addedToLove ? (
                                <HeartFilled
                                    style={{ color: '#cf1a1a' }}
                                    className="film-detail__icon"
                                />
                            ) : (
                                <HeartOutlined className="film-detail__icon" />
                            )}
                        </a>

                        <a className="h-10 w-10 rounded-full border-[1.5px] border-white  ">
                            <ShareAltOutlined className="film-detail__icon" onClick={handleShare} />
                        </a>

                        <a className="h-10 w-10 rounded-full border-[1.5px] border-white">
                            <SmallDashOutlined className="film-detail__icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className='class="flex z-20 relative flex-col md:flex-row mt-32 md:mt-0 px-64'>
                <FilmDetailsSection
                    averageRating={filmDetail.averageRating}
                    numFavorite={filmDetail.numFavorite}
                />

                <div className="flex-grow min-h-[500px] pl-20 mt-[-50px] detail-tabs pr-4">
                    <FilmDetailTab filmDetail={filmDetail} />
                </div>
            </div>
            <ShareModal
                movieId={id}
                visible={shareModalVisible}
                closeModal={() => setShareModalVisible(false)}
                copiedLink={copiedLink}
                handleCopyLink={handleCopyLink}
                handleAddToLove={handleAddToLove}
                addedToLove={addedToLove}
                handleShare={handleShare}
                qrCode={qrCode}
            />
        </div>
    );
};
