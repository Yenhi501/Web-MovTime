import React from 'react';
import { Progress } from 'antd';
import { t } from '../../../utils/i18n';

interface FilmDetailsSectionProps {
    averageRating: number;
    numFavorite: number;
}

const FilmDetailsSection: React.FC<FilmDetailsSectionProps> = ({ averageRating, numFavorite }) => {
    return (
        <div className="shrink-0 md:max-w-[150px] flex items-center md:flex-col justify-center flex-row gap-20 mt-28  md:border-r border-gray-600 pt-2 ml-[-200px]">
            <div className="flex flex-col gap-6 items-center">
                <p className="text-white font-medium text-lg">{t('Evaluate')}</p>
                <div>
                    <Progress type="circle" size={68} percent={averageRating * 10} />
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center">
                <p className="text-white font-medium text-lg">{t('Favorites')}</p>
                <div>
                    <p>{numFavorite}</p>
                </div>
            </div>
        </div>
    );
};

export default FilmDetailsSection;
