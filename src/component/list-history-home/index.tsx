import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ItemHistoryHome } from '../item-history-home';
import { PaginationFilmProps } from '../pagination-film';
import './index.scss';

const moment = require('moment');

// Sửa lại
export const ListHistoryHome = ({ listFilm: searchResults }: PaginationFilmProps) => {
    const limitedSearchResults = searchResults.slice(0, 4);

    return (
        <div className="list-film-history mb-14">
            <div className="header-list-film">
                <p className="text-white text-[22px] font-medium ml-9">Tiếp tục xem</p>
            </div>
            <div className="content-list-film">
                <Row gutter={[14, 24]}>
                    {limitedSearchResults.map((result, index) => (
                        <Col key={index}>
                            {result.id && result.movieId ? (
                                <Link to={`/movie/${result.movieId}/${result.id}`}>
                                    <ItemHistoryHome
                                        title={result.title || ''}
                                        episodeNum={result.episodeNum}
                                        releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                        backgroundMovieURL={result.backgroundMovieURL || ''}
                                        movieTitle={result.movieTitle}
                                    />
                                </Link>
                            ) : (
                                <Link to={`/movie/${result.id || result.movieId}`}>
                                    <ItemHistoryHome
                                        title={result.title || ''}
                                        episodeNum={result.episodeNum}
                                        releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                        backgroundURL={result.backgroundMovieURL || ''}
                                        movieTitle={result.movieTitle}
                                    />
                                </Link>
                            )}
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};
