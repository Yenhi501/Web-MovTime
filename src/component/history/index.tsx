import { Empty } from 'antd';
import { FilmItem } from '../film-item';
import { PaginationFilm } from '../pagination-film';
import './index.scss';

export interface HistoryMoviesProps {
    dataHistorymovies: FilmItem[];
}

export const HistoryMovies = ({ dataHistorymovies }: HistoryMoviesProps) => {
    return (
        <div className="content-page-love-movies">
            {dataHistorymovies.length !== 0 ? (
                <PaginationFilm
                    title="Lịch sử xem phim"
                    listFilm={dataHistorymovies}
                    number={4.8}
                    onCancelClick={true}
                    context="historyList"
                />
            ) : (
                <Empty
                    className="mt-40"
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={<p className="text-gray-100">Danh sách yêu thích trống</p>}
                />
            )}
        </div>
    );
};
