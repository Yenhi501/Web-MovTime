import { HistoryMoviesProps } from '../history';
import { ListHistoryHome } from '../list-history-home';

export const HistoryMoviesHome = ({ dataHistorymovies }: HistoryMoviesProps) => {
    return (
        <div className="content-page-love-movies mb-[-50px]">
            {dataHistorymovies.length !== 0 ? (
                <ListHistoryHome
                    listFilm={dataHistorymovies}
                    number={4.8}
                    onCancelClick={true}
                    context="historyList"
                />
            ) : null}
        </div>
    );
};
