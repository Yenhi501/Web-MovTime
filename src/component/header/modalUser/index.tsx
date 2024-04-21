import {
    HeartOutlined,
    HistoryOutlined,
    LogoutOutlined,
    RightOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

interface ContentItemProps {
    icon: JSX.Element;
    title: string;
    to?: string | undefined;
}

const ContentItem: React.FC<ContentItemProps> = ({ icon, title, to }) => (
    <div className="flex items-center justify-center mb-[10px] item-user">
        <div className="mr-[10px]">{icon}</div>
        <div>{title}</div>
    </div>
);

export const ContentModalUser: React.FC = () => {
    const contentItems: ContentItemProps[] = [
        { icon: <UserOutlined />, title: 'Thông tin cá nhân', to: '/foryou/profile' },
        { icon: <UnorderedListOutlined />, title: 'Sưu tập của tôi', to: '/foryou/watch-later' },
        { icon: <HistoryOutlined />, title: 'Lịch sử xem', to: '/foryou/watched-movies' },
        { icon: <HeartOutlined />, title: 'Danh sách yêu thích', to: '/foryou/love-movies' },
        { icon: <LogoutOutlined />, title: 'Đăng xuất' },
    ];

    return (
        <div>
            {contentItems.map((item, index) => (
                <div key={index}>
                    {item.to ? (
                        <Link to={item.to}>
                            <div className="flex justify-between mt-2 hover:bg-[#e9e9e9] text-black pt-3 px-3 cursor-pointer">
                                <ContentItem icon={item.icon} title={item.title} />
                                <RightOutlined className="ml-20 mb-2 text-sm icon" />
                            </div>
                        </Link>
                    ) : (
                        <div className="flex justify-between mt-2 hover:bg-[#e9e9e9] pt-3 px-3 cursor-pointer">
                            <ContentItem icon={item.icon} title={item.title} />
                            <RightOutlined className="ml-20 mb-2 text-sm icon" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
