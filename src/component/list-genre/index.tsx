import { ReactNode, useState } from 'react';
import './index.scss';

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

    const handleNext = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + maxVisibleGenres, genres.length - maxVisibleGenres));
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - maxVisibleGenres, 0));
    };

    const visibleGenres = genres.slice(startIndex, startIndex + maxVisibleGenres);

    return (
        <>
        <p className='font-bold text-[22px] ml-20 mb-5'>Danh mục</p>
        <div className="list-genre-container ml-20 mb-16 mt-4">
            {startIndex > 0 && (
                <button className="arrow-button left" onClick={handlePrev}>
                    &lt;
                </button>
            )}
            <div className="list-genre-content">
                {visibleGenres.map((genre, index) => (
                    <h2 key={genre.genreId} className={`list-title genre-${index % 6}`}>
                        {genre.name}
                    </h2>
                ))}
            </div>
            {startIndex + maxVisibleGenres < genres.length && (
                <button className="arrow-button right" onClick={handleNext}>
                    &gt;
                </button>
            )}
        </div>
        </>
    );
};
