import React from 'react';
import './index.scss';
import { PaginationFilm } from '../pagination-film';
import { FilmItem } from '../film-item';
import { Empty } from 'antd';
import { t } from '../../utils/i18n';

interface WatchLaterProps {
    dataCollect: FilmItem[];
}

export const WatchLater = ({ dataCollect }: WatchLaterProps) => {
    return (
        <div className="content-page-watch-later">
            {dataCollect.length !== 0 ? (
                <PaginationFilm
                    title={t('MovieCollection')}
                    listFilm={dataCollect}
                    number={4.8}
                    onCancelClick={true}
                    context="watchList"
                />
            ) : (
                <Empty
                    className="mt-40"
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={<p className="text-gray-100">{t('MovieListIsEmpty')}</p>}
                />
            )}
        </div>
    );
};
