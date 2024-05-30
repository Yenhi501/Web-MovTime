import { Empty } from 'antd';
import { FilmItem } from '../film-item';
import { PaginationFilm } from '../pagination-film';
import './index.scss';

interface LoveMoviesProps {
    dataLovemovies: FilmItem[];
}

export const LoveMovies = ({ dataLovemovies }: LoveMoviesProps) => {
    return (
        <div className="content-page-love-movies">
            {dataLovemovies.length !== 0 ? (
                <PaginationFilm
                    title="Phim yêu thích"
                    listFilm={dataLovemovies}
                    number={4.8}
                    onCancelClick={true}
                    context="favoriteList"
                />
            ) : (
                <Empty
                    className="mt-40"
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={<p className="text-gray-100">Danh sách phim trống</p>}
                />
            )}
        </div>
    );
};
