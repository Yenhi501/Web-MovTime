import { CloseOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Col, Modal, Pagination, Row } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDataCollect } from '../../redux/dataCollectSlide';
import { request } from '../../utils/request';
import { FilmItem } from '../film-item';
import { FilmItemHistory } from '../film-item-history';
import './index.scss';
import React from 'react';

const moment = require('moment');

export type PaginationFilmProps = {
    title?: string | React.ReactNode;
    listFilm: Array<FilmItem>;
    number: number;
    onCancelClick?: ((filmName: string) => void) | boolean;
    context?: string;
    amountMovies?: number;
    currPage?: number;
    setCurrPage?: (props?: any) => void;
    hidden?: boolean;
};

export const PaginationFilm = ({
    title,
    listFilm: searchResults,
    number,
    onCancelClick,
    context,
    amountMovies,
    currPage,
    setCurrPage = () => {},
    hidden,
}: PaginationFilmProps) => {
    const [open, setOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<FilmItem | null>(null);
    const [listFilm, setListFilm] = useState(searchResults);
    useEffect(() => {
        setListFilm(searchResults);
    }, [searchResults]);

    const showModal = (film: FilmItem) => {
        setSelectedFilm(film);
        setOpen(true);
    };

    const handleCancel = () => {
        setSelectedFilm(null);
        setOpen(false);
    };

    const handleOkClick = () => {
        if (selectedFilm) {
            handleCancelClick(selectedFilm.id || 0, context || '');
            handleCancel();
        }
    };

    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';

    const dispatch = useDispatch();

    const handleCancelClick = async (filmId: number, context: string) => {
        try {
            let apiEndpoint = '';
            if (context === 'watchList') {
                apiEndpoint = 'user/delete-watch-list';
            } else if (context === 'favoriteList') {
                apiEndpoint = 'user/delete-favorite-movie';
            } else if (context === 'historyList') {
                apiEndpoint = 'user/delete-movie-history';
            }

            const endpointWithParams =
                context === 'historyList'
                    ? `${apiEndpoint}?episodeId=${filmId}`
                    : `${apiEndpoint}?movieId=${filmId}`;

            const response = await request.delete(endpointWithParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.data.status === 'Ok!') {
                const updatedListFilm = listFilm.filter((film) => film.id !== filmId);
                setListFilm(updatedListFilm);
                dispatch(setDataCollect(updatedListFilm));
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="list-film min-h-[60vh]" hidden={hidden}>
            <div className="header-list-film">
                <VideoCameraOutlined className="header-list-film-icon" />
                <p className="header-list-film-title">{title}</p>
            </div>
            <div className="content-list-film">
                <Row gutter={[12, 24]}>
                    {listFilm.map((result, index) => (
                        <Col span={number} key={index}>
                            {result.id && result.movieId ? (
                                <Link to={`/movie/${result.movieId}/${result.id}`}>
                                    {result.posterMovieURL ? (
                                        <FilmItemHistory
                                            title={result.title || ''}
                                            episodeNum={result.episodeNum}
                                            releaseDate={
                                                moment(result.releaseDate).format('YYYY') || 0
                                            }
                                            posterURL={result.posterURL || ''}
                                            posterMovieURL={result.posterMovieURL || ''}
                                        />
                                    ) : (
                                        <FilmItem
                                            title={result.title || ''}
                                            episodeNum={result.episodeNum}
                                            releaseDate={
                                                moment(result.releaseDate).format('YYYY') || 0
                                            }
                                            posterURL={result.posterURL || ''}
                                            posterMovieURL={result.posterMovieURL || ''}
                                        />
                                    )}
                                </Link>
                            ) : (
                                <Link to={`/movie/${result.id || result.movieId}`}>
                                    {result.posterMovieURL ? (
                                        <FilmItemHistory
                                            title={result.title || ''}
                                            episodeNum={result.episodeNum}
                                            releaseDate={
                                                moment(result.releaseDate).format('YYYY') || 0
                                            }
                                            posterURL={result.posterURL || ''}
                                            posterMovieURL={result.posterMovieURL || ''}
                                        />
                                    ) : (
                                        <FilmItem
                                            title={result.title || ''}
                                            episodeNum={result.episodeNum}
                                            releaseDate={
                                                moment(result.releaseDate).format('YYYY') || 0
                                            }
                                            posterURL={result.posterURL || ''}
                                            posterMovieURL={result.posterMovieURL || ''}
                                        />
                                    )}
                                </Link>
                            )}
                            <button onClick={() => showModal(result)}>
                                {onCancelClick ? (
                                    <div className="btn-close">
                                        <CloseOutlined />
                                    </div>
                                ) : undefined}
                            </button>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="footer-list-film">
                <Pagination
                    current={currPage}
                    defaultPageSize={12}
                    total={amountMovies}
                    onChange={(event) => setCurrPage(event)}
                />
            </div>

            <Modal title="Dọn dẹp!" visible={open} onOk={handleOkClick} onCancel={handleCancel}>
                <p>{`Bạn chắc chắn muốn xóa "${selectedFilm?.title}" ?`}</p>
            </Modal>
        </div>
    );
};
