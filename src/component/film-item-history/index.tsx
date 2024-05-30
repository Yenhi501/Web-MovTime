import { CaretRightOutlined } from '@ant-design/icons';
import { Badge, Skeleton } from 'antd';
import { useState } from 'react';
import { FilmItem } from '../film-item';
import './index.scss';

export const FilmItemHistory = ({ episodeNum, title, posterMovieURL }: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);

    return (
        <Badge.Ribbon
            text="MovTime"
            color="red"
            className={`${isLoadingImg === true ? 'hidden' : ''}`}
        >
            <div className="film-item-container relative">
                <Skeleton.Image
                    active
                    className={`absolute z-10 h-full w-full ${
                        isLoadingImg === false ? 'hidden' : ''
                    }`}
                />
                <img
                    src={posterMovieURL}
                    alt=""
                    className="film-item-image"
                    onLoad={() => setIsLoadingImg(false)}
                />
                <div className="btn-play z-10">
                    <CaretRightOutlined className="text-white" />
                </div>
            </div>
            <h1 className="film-item-title max-w-[204px]">{title}</h1>
        </Badge.Ribbon>
    );
};
