import { Carousel, Col, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CarouselRef } from 'antd/es/carousel';
import { ListEpisodesType } from '../index';
import './index.scss';

export const EspKanban = ({ listEpisodes }: ListEpisodesType) => {
    const { episodeId } = useParams();
    const listRef = useRef<CarouselRef>(null);
    return (
        <div className="list">
            <Carousel className="list-content" dots={false} ref={listRef}>
                <div>
                    <Row justify="center">
                        {listEpisodes.map((value) => (
                            <Col span={4} className="list-col-item ">
                                <Link to={`/movie/${value.movie_id}/${value.episode_id}`}>
                                    <div
                                        className={`movie-item ${
                                            episodeId !== undefined &&
                                            value.episode_id !== undefined &&
                                            value.episode_id === parseInt(episodeId)
                                                ? 'current-item'
                                                : ''
                                        }`}
                                    >
                                        {value.title.match(/\d+/)}
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Carousel>
        </div>
    );
};
