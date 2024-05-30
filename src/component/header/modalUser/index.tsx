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
import { t } from '../../../utils/i18n';

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
        { icon: <UserOutlined />, title: t('PersonalInformation'), to: '/foryou/profile' },
        { icon: <UnorderedListOutlined />, title: t('MyCollection'), to: '/foryou/watch-later' },
        { icon: <HistoryOutlined />, title: t('ViewHistory'), to: '/foryou/watched-movies' },
        { icon: <HeartOutlined />, title: t('FavoritesList'), to: '/foryou/love-movies' },
        { icon: <LogoutOutlined />, title: t('LogOut') },
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
