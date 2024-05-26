import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Col, MenuProps, Row } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useEffect, useRef, useState } from 'react';
import { Film } from '../../model/film';
import { ItemReserveMovie } from '../item-reserve-movie';
import './index.scss';

export type ListFilm = {
    title?: string;
    subInfo?: Array<string>;
    sessions?: MenuProps['items'];
    listFilm: Array<Film>;
    multiSessions?: boolean;
    genreId?: number;
};
export const ListReserveMovies = ({
    title,
    subInfo,
    sessions = [],
    listFilm = [],
    multiSessions = false,
    genreId,
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
        <div className="list-container-reserve">
            <div className="list-heading">
                <div className="list-sub-info">
                    {subInfo?.map((item) => (
                        <p className="list-sub-info-item">{item}</p>
                    ))}
                </div>
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
                                    <Col span={4} className="list-col" key={value.movieId}>
                                        <div className="w-[98%] mb-10 px-2">
                                            <div className="coming-soon-timeline-wrapper">
                                                <div className="timeline-line"></div>
                                                <div className="timeline-point"></div>
                                            </div>
                                            <p className="text-release">
                                                {moment(value.releaseDate).format('DD/MM/YY')}
                                            </p>
                                        </div>
                                        <ItemReserveMovie
                                            movieId={value.movieId}
                                            title={value.title}
                                            episodeNum={value.episodeNum}
                                            posterURL={value.posterURL}
                                            level={value.level}
                                            releaseDate={value.releaseDate}
                                        />
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
