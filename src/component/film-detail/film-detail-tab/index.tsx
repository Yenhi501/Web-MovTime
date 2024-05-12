import { Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import { FilmDetailCast } from '../film-detail-cast';
import { FilmDetailDirector } from '../film-detail-director';
import FilmDetailEpisodes from '../film-detail-episodes';
import FilmDetailReview from '../film-detail-review';
import { FilmDetailOverall } from './../film-detail-overall/index';
import './index.scss';
import { FilmDetailRelate } from '../film-relate';
import FilmDetailTrailer from '../film-trailer';
import { t } from '../../../utils/i18n';

interface FilmDetailTabProps {
    filmDetail: any;
}

export const FilmDetailTab: React.FC<FilmDetailTabProps> = ({ filmDetail }) => {
    const [activeTab, setActiveTab] = useState<string>('1');

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case '1':
                return <FilmDetailOverall filmDetail={filmDetail} />;
            case '2':
                return <FilmDetailTrailer filmDetail={filmDetail} />;
            case '3':
                return <FilmDetailDirector filmDetail={filmDetail} />;

            case '4':
                return <FilmDetailCast filmDetail={filmDetail} />;

            case '5':
                return <FilmDetailEpisodes filmDetail={filmDetail} />;

            case '6':
                return <FilmDetailReview />;

            case '7':
                return <FilmDetailRelate filmDetail={filmDetail} />;
            default:
                return null;
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t('Overall'),
        },
        {
            key: '2',
            label: t('Trailer'),
        },
        {
            key: '3',
            label: t('Director'),
        },
        {
            key: '4',
            label: t('Actor'),
        },
        {
            key: '5',
            label: t('Episode'),
        },
        {
            key: '6',
            label: t('Evaluate'),
        },
        {
            key: '7',
            label: t('RelatedMovies'),
        },
    ];
    return (
        <div>
            <Tabs
                className="hover:text-white transition duration-300 pb-1 false"
                style={{ color: 'white' }}
                defaultActiveKey="1"
                items={items}
                activeKey={activeTab}
                onChange={onChange}
            />
            {renderTabContent()}
        </div>
    );
};
