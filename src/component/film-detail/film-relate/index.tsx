import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { request } from '../../../utils/request';
import { FilmItem } from '../../film-item';
import './index.scss';

interface FilmDetailRelateProps {
    filmDetail: any;
}

export const FilmDetailRelate: React.FC<FilmDetailRelateProps> = ({ filmDetail }) => {
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams<{ id: string }>();
    const itemsPerPage = 4;
    const rowsPerPage = 2;

    useEffect(() => {
        const fetchRelatedMovies = async () => {
            try {
                const response = await request.get(`movies/recommend/related-movies?movieId=${id}`);
                setRelatedMovies(response.data.data);
            } catch (error) {
                console.error('Error fetching related movies:', error);
            }
        };

        fetchRelatedMovies();
    }, [id]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage * rowsPerPage;
    const endIndex = startIndex + itemsPerPage * rowsPerPage;

    return (
        <div className="!px-0 content-related">
            <div className="content-list-film-related flex flex-wrap gap-5 !mt-10 ml-[-10px] mb-16">
                {relatedMovies.slice(startIndex, endIndex).map((movie: any) => (
                    <Link to={`/movie/${movie.movieId}`} className="mb-4" target="_parent">
                        <FilmItem
                            title={movie.title || ''}
                            episodeNum={movie.episodeNum}
                            posterURL={movie.backgroundURL || ''}
                            posterMovieURL={movie.backgroundURL || ''}
                        />
                    </Link>
                ))}
            </div>

            <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={relatedMovies.length}
                pageSize={itemsPerPage * rowsPerPage}
            />
        </div>
    );
};
