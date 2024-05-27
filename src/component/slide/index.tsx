import {
    CaretRightOutlined,
    HeartFilled,
    HeartOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Spin, message } from 'antd';

import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { ColectIcon, ColectedIcon } from '../../asset/icon/collectionIcon';
import { Start } from '../../asset/icon/start';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import { endpoint } from '../../utils/baseUrl';
import { FilmItem } from '../film-item';
import './index.scss';
import { Movie } from './type';
import { FacebookShareButton } from 'react-share';
import { t } from '../../utils/i18n';

const Slide: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [movieId, setMovieId] = useState<number>(0);
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [qrCode, setQrCodeUrl] = useState<string | null>(null);

    const carouselRef = useRef<Carousel>(null);
    const fetchData = () => {
        fetch(`${endpoint}/api/movies?page=1&pageSize=8&sort=highFavorited&sortBy=DESC`)
            .then((res) => res.json())
            .then((data) => {
                setPopularMovies(data.movies);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchData();
    }, []);

    function formatYear(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handleShareClick = async () => {
        if (isUserLoggedIn) {
            const currentIndex = carouselRef.current?.state.selectedItem ?? 0;
            const currentMovie = popularMovies[currentIndex];
            const movieId = currentMovie?.movieId;
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
                    setCopiedLink(actorLink);
                    setShareModalVisible(true);
                } else {
                    console.error('Failed to fetch QR code URL');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setModalVisible(true);
        }
    };

    const handleCopyLink = () => {
        if (copiedLink) {
            navigator.clipboard.writeText(copiedLink);
            message.success('Sao chép thành công');
        }
    };

    //bộ sưu tập
    const [addedToCollection, setAddedToCollection] = useState<boolean>(false);
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    // const [filmDetail, setFilmDetail] = useState<any>(null);
    //yêu thích
    const [addedToLove, setAddedToLove] = useState<boolean>(false);
    const [dataLove, setDataLove] = useState<FilmItem[]>([]);
    const [loading, setLoading] = useState(true);

    //check watch later
    const [dataCollect, setDataCollect] = useState<FilmItem[]>([]);

    const fetchWatchLaterList = async () => {
        try {
            const response = await request.get('user/get-watch-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data?.data?.ListMovie;
            setDataCollect(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFilmDetailsInCollections = (movieId: number, dataCollect: FilmItem[] = []) => {
        if (movieId) {
            const isFilmDetailInWatchLater = dataCollect.some(
                (item: FilmItem) => item.id === movieId,
            );
            setAddedToCollection(isFilmDetailInWatchLater);
        }
    };
    const fetchDataAndWatchLaterList = async () => {
        checkFilmDetailsInCollections(movieId, dataCollect);
    };
    //check lovemovie
    const fetchLoveList = async () => {
        try {
            const response = await request.get('user/get-favorite-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data?.data?.ListMovie;
            setDataLove(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFilmDetailsInLove = (movieId: number, dataLove: FilmItem[] = []) => {
        if (movieId) {
            const isFilmDetailInLove = dataLove.some((item: FilmItem) => item.id === movieId);
            setAddedToLove(isFilmDetailInLove);
        }
    };

    const fetchDataAndLoveList = async () => {
        checkFilmDetailsInLove(movieId, dataLove);
    };

    useEffect(() => {
        fetchWatchLaterList();
    }, [addedToCollection]);

    useEffect(() => {
        fetchLoveList();
    }, [addedToLove]);

    useEffect(() => {
        fetchDataAndWatchLaterList();
        fetchDataAndLoveList();
    }, [isUserLoggedIn, movieId, dataCollect, dataLove]);

    //api add bộ sưu tập
    const handleAddToCollection = async (movieId: number) => {
        if (!isUserLoggedIn) {
            setModalVisible(true);
        }
        if (movieId && dataCollect) {
            // Add a check for dataCollect
            const isFilmDetailInWatchLater = dataCollect.some(
                (item: FilmItem) => item.id === movieId,
            );
            if (!isFilmDetailInWatchLater) {
                try {
                    const response = await request.get(`user/add-watch-list?movieId=${movieId}`, {
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
                    const response = await request.delete(
                        `user/delete-watch-list?movieId=${movieId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );
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
    const handleAddToLove = async (movieId: number) => {
        setMovieId(movieId);
        if (!isUserLoggedIn) {
            setModalVisible(true);
        }
        if (movieId && dataLove) {
            // Add a check for dataLove
            const isFilmDetailInLove = dataLove.some((item: FilmItem) => item.id === movieId);
            if (!isFilmDetailInLove) {
                try {
                    const response = await request.get(
                        `user/add-favorite-movie?movieId=${movieId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );
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
                        `user/delete-favorite-movie?movieId=${movieId}`,
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
        <>
            <div className="poster">
                <Carousel
                    className="slide"
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={4}
                    infiniteLoop={true}
                    showStatus={false}
                    ref={carouselRef}
                    showIndicators={false}
                    onChange={(index) => {
                        const movieId = popularMovies[index]?.movieId;
                        setMovieId(movieId);
                        const newCopiedLink = `${window.location.origin}/movie/${movieId}`;
                        setCopiedLink(newCopiedLink);
                    }}
                >
                    {popularMovies.map((movie, index) => (
                        <div className="poster__item slide-item" key={movie.movieId}>
                            <div className="poster__image">
                                <img src={movie.backgroundURL} alt={movie.title} />
                            </div>
                            <div className="overlay"></div>

                            <div className="poster__image-overlay">
                                <div
                                    className={`poster__image-title ${
                                        isTitleVisible ? 'visible' : ''
                                    }`}
                                >
                                    <h2 className="md:text-5xl font-black tracking-normal md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
                                        {movie ? movie.title : ''}
                                    </h2>
                                </div>

                                <h2
                                    className={`poster__image-listInfo ${
                                        isTitleVisible ? 'visible' : ''
                                    }`}
                                >
                                    <span
                                        className="poster__movie-info"
                                        style={{
                                            color: '#cf1a1a',
                                        }}
                                    >
                                        <Start />
                                        <p style={{ fontWeight: 600, marginLeft: '5px' }}>
                                            {movie.averageRating}
                                        </p>
                                    </span>
                                    <span className="poster__movie-info">
                                        <p>{movie ? formatYear(movie.releaseDate) : ''}</p>
                                    </span>
                                    <span>
                                        <p>Trọn bộ {movie.episodeNum} tập</p>
                                    </span>
                                </h2>
                                <div
                                    className={`poster__image-runtime ${
                                        isTitleVisible ? 'visible' : ''
                                    }`}
                                >
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.genre_id}
                                            className="px-3 py-1 poster__image-padding"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    className={`poster__image-description ${
                                        isTitleVisible ? 'visible' : ''
                                    }`}
                                >
                                    {movie ? movie.description : ''}
                                </div>

                                <div
                                    className={`poster__image-listButton ${
                                        isTitleVisible ? 'visible' : ''
                                    }`}
                                >
                                    <Link
                                        className="btn"
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        to={`/movie/${movie.movieId}`}
                                        key={movie.movieId}
                                    >
                                        <CaretRightOutlined className="btn-icon" />
                                        {t('PlayNow')}
                                    </Link>

                                    <button
                                        className=" mr-4 "
                                        onClick={() => handleAddToLove(movie.movieId)}
                                    >
                                        {addedToLove ? (
                                            <HeartFilled
                                                style={{ color: '#cf1a1a' }}
                                                className="btn-heart"
                                            />
                                        ) : (
                                            <HeartOutlined className="btn-heart" />
                                        )}
                                    </button>
                                    <button onClick={() => handleAddToCollection(movie.movieId)}>
                                        {addedToCollection ? <ColectedIcon /> : <ColectIcon />}
                                    </button>

                                    <ShareAltOutlined
                                        className="btn-heart ml-4"
                                        onClick={() => handleShareClick()}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <Modal
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={
                        <Button
                            className="poster__image-close"
                            type="primary"
                            onClick={() => setModalVisible(false)}
                        >
                            Đóng
                        </Button>
                    }
                    style={{ textAlign: 'center', marginTop: '100px' }}
                >
                    <div className="poster__image-notifi">Thông báo</div>
                    <p className="poster__image-notifititle">
                        Vui lòng{' '}
                        <Link
                            style={{ color: 'var(--primary-color)', fontWeight: 700 }}
                            to="/login"
                        >
                            Đăng nhập
                        </Link>{' '}
                        để tiếp tục sử dụng dịch vụ.
                    </p>
                </Modal>

                <Modal
                    title={<p className="flex items-center justify-center mb-2">Chia sẻ</p>}
                    visible={shareModalVisible}
                    footer={null}
                    onCancel={() => setShareModalVisible(false)}
                    width={450}
                >
                    <div className="flex gap-10 items-center justify-center">
                        <FacebookShareButton url={`http://movetimes.tech/movie/${movieId}`}>
                            <a className="modal-item flex flex-col items-center">
                                <img
                                    className="modal-img ml-4"
                                    src="https://www.iqiyipic.com/lequ/20220216/Facebook@3x.png"
                                    alt="facebook"
                                />
                                <p className="text-sm mt-2"> Facebook</p>
                            </a>
                        </FacebookShareButton>

                        <a className="modal-item  flex flex-col" onClick={handleCopyLink}>
                            <img
                                className="modal-img ml-4"
                                src="https://www.iqiyipic.com/lequ/20220216/copylink@2x.png"
                                alt="addresss"
                            />
                            <p className="text-sm mt-2">Sao chép link</p>
                        </a>
                    </div>
                    <Divider className="!bg-gray-600" />
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p>Quét để chia sẻ trên thiết bị di động</p>
                        {qrCode ? (
                            <img
                                src={qrCode}
                                alt="QR Code"
                                style={{ width: '100px', height: '100px', marginTop: '15px' }}
                            />
                        ) : (
                            <Spin></Spin>
                        )}
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default Slide;
