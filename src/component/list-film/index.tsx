import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Dropdown, MenuProps, Row } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../model/film';
import { FilmItem } from '../film-item';
import './index.scss';

export type ListFilm = {
    title?: ReactNode | string;
    subInfo?: Array<string>;
    sessions?: MenuProps['items'];
    listFilm: Array<Film>;
    multiSessions?: boolean;
    genreId?: number;
    isShow?: boolean;
};
export const ListFilm = ({
    title,
    subInfo,
    sessions = [],
    listFilm = [],
    multiSessions = false,
    genreId,
    isShow,
}: ListFilm) => {
    const moment = require('moment');
    const listRef = useRef<CarouselRef>(null);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [multipleListFilm, setMultipleListFilm] = useState<Array<Film[]>>([]);

    const handleSplitListFilm = () => {
        let counts = 1;
        const listTemp: Array<Film[]> = [];
        let arrTemp: Film[] = [];

        if (Array.isArray(listFilm)) {
            listFilm.forEach((film) => {
                arrTemp.push(film);

                if (counts % 6 === 0 || counts === listFilm.length) {
                    listTemp.push(arrTemp);
                    arrTemp = [];
                }
                counts++;
            });
        } else {
            console.error('listFilm is not an array!');
        }

        return listTemp;
    };

    useEffect(() => {
        const handledListFilm = handleSplitListFilm();
        setMultipleListFilm(handledListFilm);
        setMaxPage(handledListFilm.length);
    }, [listFilm]);

    return (
        <div className="list-container">
            <div className="list-heading">
                <div className="flex items-center justify-between">
                    <h2 className="list-title ml-20 mb-1 font-medium">{title}</h2>
                    {isShow === false ? (
                        ''
                    ) : (
                        <Link
                            to={{
                                pathname: '/search',
                                search: `genre=${genreId}`,
                            }}
                            className={`mt-1 text-red-500 hover:text-red-600 mr-20 ${
                                listFilm.length < 6 ? 'hidden' : ''
                            }`}
                        ></Link>
                    )}
                </div>
                <div className="list-sub-info">
                    {subInfo?.map((item) => (
                        <p className="list-sub-info-item">{item}</p>
                    ))}
                </div>
            </div>
            <div className={`session-section ${multiSessions === true ? 'show' : ''}`}>
                <Dropdown
                    menu={{ items: sessions }}
                    trigger={['click']}
                    className="session-section-select"
                >
                    <Button className="session-btn-select">
                        Mùa 1
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="list mb-16">
                <div
                    className={`icon-list-container left-move-container ${
                        page === 1 ? 'hide' : ''
                    }`}
                    onClick={() => {
                        listRef.current?.prev();
                        setPage((prev) => prev - 1);
                    }}
                >
                    <LeftOutlined className="icon-list " />
                </div>
                <div
                    className={`icon-list-container right-move-container ${
                        page === maxPage ? 'hide' : ''
                    }`}
                    onClick={() => {
                        listRef.current?.next();
                        setPage((prev) => prev + 1);
                    }}
                >
                    <RightOutlined className="icon-list" />
                </div>
                <Carousel className="list-content" ref={listRef} dots={false}>
                    {multipleListFilm.map((listFilms) => (
                        <div>
                            <Row justify={'start'}>
                                {listFilms.map((value) => (
                                    <Col span={4} className="list-col">
                                        <Link to={`/movie/${value.movieId}`}>
                                            <FilmItem
                                                title={value.title}
                                                releaseDate={moment(value.releaseDate).format(
                                                    'YYYY-MM-DD',
                                                )}
                                                episodeNum={value.episodeNum}
                                                // genres={value.genres.map((genre: any) => genre.name)}
                                                posterURL={value.posterURL}
                                                level={value.level}
                                            />
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};
