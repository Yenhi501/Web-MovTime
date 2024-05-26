import { StarFilled } from '@ant-design/icons';
import { Popover } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { ModalRating } from '../../page/watching/modalRating';
import './index.scss';

export type MainInfoFilm = {
    name: string;
    view: string;
    rate: string;
    hashtag?: Array<string>;
    episode?: string;
    desc: string;
    className?: string;
    movieId: number;
    rating: number;
    level?: number;
};
export const MainInfoFilm = ({
    name,
    view,
    rate,
    hashtag,
    episode,
    desc,
    className,
    movieId,
    rating,
    level,
}: MainInfoFilm) => {
    return (
        <div className={`main-info-container ${className}`}>
            <div className="name-esp">
                <h1 className="name">{name} </h1>
                {'-'}
                <h1 className="episode">{episode}</h1>
            </div>
            <div className="view-info flex items-center">
                <div className="rating">
                    <StarFilled style={{ color: '#fadb14', fontSize: 16 }} />
                    <p className="text-[14px] ml-1 ">
                        {rate} ({view} lượt xem)
                    </p>
                </div>
                <Popover
                    overlayStyle={{ maxWidth: '100%' }}
                    content={<ModalRating movieId={movieId} rating={rating} />}
                >
                    <div className="text-[14px] text-[#cf1a1a]" style={{ cursor: 'pointer' }}>
                        Đánh giá ngay
                    </div>
                </Popover>
            </div>
            <div className="hashtag mb-2 flex items-center">
                {hashtag?.map((value) => (
                    <a href="#" className="!px-4 !py-2 poster__image-padding">
                        {value}
                    </a>
                ))}
                {level === 1 ? (
                    <p className="!px-4 !py-2 !bg-[#cf1a1a] poster__image-padding">VIP</p>
                ) : (
                    ''
                )}
            </div>

            <Paragraph
                className="desc "
                ellipsis={{ rows: 3, expandable: true, symbol: 'Xem thêm' }}
            >
                {desc}
            </Paragraph>
        </div>
    );
};
