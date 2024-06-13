import { Badge, Pagination } from 'antd';
import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { EpisodeFilm } from '../../../model/film';
import { CaretRightOutlined } from '@ant-design/icons';
import { t } from '../../../utils/i18n';

interface FilmDetail {
    episodes: EpisodeFilm[];
}

interface FilmDetailEpisodesProps {
    filmDetail: FilmDetail;
}

const FilmDetailEpisodes: React.FC<FilmDetailEpisodesProps> = ({ filmDetail }) => {
    const { episodes } = filmDetail;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const startIdx = (currentPage - 1) * pageSize;
    const visibleEpisodes = episodes.slice(startIdx, startIdx + pageSize);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <p className="episodes-length">
                {t('TotalNumberOfEpisodes')} : {episodes.length}
            </p>

            <div className="grid grid-cols-5 gap-x-9 gap-y-[5.1rem] mt-8 episode-item">
                {visibleEpisodes.map((episode) => (
                    <Badge.Ribbon text={episode.title} color="red" key={episode.episode_id}>
                        <Link
                            to={`/movie/${episode.movie_id}/${episode.episode_id}`}
                            className="episode-link"
                        >
                            <img
                                className="object-cover h-[100%] w-[100%] rounded-[3px] episodes-image"
                                alt={episode.title}
                                src={episode.poster_url}
                            />
                            <div className="episodes-btnplay">
                                <CaretRightOutlined />
                            </div>
                        </Link>
                        <p className="episodes-des">
                            Giang Quân và Viên Soái là "thanh mai trúc mã", nhưng cô lại đem lòng
                            yêu người khác.
                        </p>
                    </Badge.Ribbon>
                ))}
            </div>

            <div className="pagination-container mt-28 text-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={episodes.length}
                    onChange={onPageChange}
                />
            </div>
        </>
    );
};

export default FilmDetailEpisodes;
