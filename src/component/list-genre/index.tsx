import { BulbOutlined, CustomerServiceOutlined, DingtalkOutlined, DropboxOutlined, LeftOutlined, RightOutlined, RubyOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import { t } from '../../utils/i18n';
import './index.scss';

const genreIcons = [
    <DingtalkOutlined />,
    <CustomerServiceOutlined />,
    <BulbOutlined />,
    <DropboxOutlined />,
    <RubyOutlined />,
];

export type Genre = {
    genreId: string;
    name: ReactNode | string;
};

export type DataMovieByGenre = {
    genreId: number;
    name: ReactNode | string;
};

export type ListFilmProps = {
    genres: Genre[];
};

export const ListGenre = ({ genres }: ListFilmProps) => {
    const [startIndex, setStartIndex] = useState(0);
    const maxVisibleGenres = 6;

    const allGenres = [{ genreId: 'all', name: t('All') }, ...genres];

    const handleNext = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + maxVisibleGenres, allGenres.length - maxVisibleGenres));
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - maxVisibleGenres, 0));
    };

    const visibleGenres = allGenres.slice(startIndex, startIndex + maxVisibleGenres);

    const renderSkeletons = () => {
        return Array.from({ length: maxVisibleGenres }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2 list-title genre-skeleton">
                <Skeleton.Avatar size={50} active={true} shape="square" />
                <Skeleton.Input style={{ width: '80%', height: '10px' }} active={true} />
            </div>
        ));
    };

    return (
        <div className='my-16'>
            <p className='font-bold text-[22px] ml-[67px]'>{t('Category')}</p>
            <div className="list-genre-container mb-16 mt-5">
                {startIndex > 0 ? (
                    <button className="arrow-button left" onClick={handlePrev}>
                        <LeftOutlined />
                    </button>
                ) : (
                    <div className="arrow-placeholder left" />
                )}
                <div className="list-genre-content">
                    {genres.length > 0 ? (
                        visibleGenres.map((genre, index) => (
                            <Link
                                to={genre.genreId === 'all' ? `/search` : `/search?genre=${genre.genreId}`}
                                key={genre.genreId}
                                className={`flex flex-col gap-2 list-title genre-${index % 6}`}
                                style={{ cursor: 'pointer', textDecoration: 'none' }}
                            >
                                <p className='text-[18px]'>{genreIcons[index % genreIcons.length]}</p>
                                <h2 className='!text-[15px] font-medium'>{genre.name}</h2>
                            </Link>
                        ))
                    ) : (
                        renderSkeletons()
                    )}
                </div>
                {startIndex + maxVisibleGenres < allGenres.length ? (
                    <button className="arrow-button right" onClick={handleNext}>
                        <RightOutlined />
                    </button>
                ) : (
                    <div className="arrow-placeholder right" />
                )}
            </div>
        </div>
    );
};
