import {
    BellOutlined,
    CrownOutlined,
    HistoryOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Popover, Tooltip, notification } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logo, LogoIcon } from '../../asset/icon/logo';
import { useToken } from '../../hooks/useToken';
import { defaultCurrentUser } from '../../model/user';
import { useAppSelector } from '../../redux/hook';
import { setIsLogin } from '../../redux/isLoginSlice';
import { request } from '../../utils/request';
import { CurrentUser } from '../comment/type';
import { Search } from '../header/search/index';
import { DropdownList } from './dropdownList/index';
import { DataHeader, handleDataHomeHeader } from './handle-data-header';
import './index.scss';
import { ContentModalHistory } from './modalHistory';
import { ContentModalHistoryTitle } from './modalHistoryTitle';
import { ContentModalUser } from './modalUser';
import { ContentModalVip } from './modalVip';
import { ContentModalVipTitle } from './modalVipTitle';
import Language from '../language';
import { t } from '../../utils/i18n';
import useDevice from '../../hooks/useDevice';
export type Header = { className?: string };

export const Header = ({ className }: Header) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [items, setItems] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultCurrentUser);
    const { accessToken } = useToken();
    const isLogin = useAppSelector((state) => state.user.isLogin);

    const isLoginPage =
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/forget' ||
        location.pathname === '/payment' ||
        location.pathname === '/reset-password';

    const scrollThreshold = 66;

    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const header = document.querySelector('.wrapper-header') as HTMLElement;
        const handleScroll = () => {
            if (header) {
                if (window.scrollY > scrollThreshold) {
                    headerRef.current?.classList.add('scroll-header');
                } else {
                    headerRef.current?.classList.remove('scroll-header');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isLogin === true && accessToken != null && accessToken !== '') {
            fetchDataCurrentUser();
        }
    }, [isLogin]);

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        dispatch(setIsLogin(false));
        notification.success({
            message: 'Đăng xuất thành công',
            description: 'Chúc mừng, bạn đã đăng xuất thành công',
            placement: 'bottomRight',
        });
    };

    const fetchDataCurrentUser = async () => {
        try {
            const response = await request.get('user/get-self-information', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data;

            setCurrentUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await request.get('home/headers');

            const data: DataHeader = response.data.data;

            setItems(handleDataHomeHeader(data));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);
    const device = useDevice();

    return (
        <header
            ref={headerRef}
            className={`wrapper-header ${isLoginPage ? 'hidden' : ''} ${className}`}
        >
            <div
                className="flex justify-between items-center ml-[var(--spacing-lg)] mr-[calc(var(--spacing-lg) + var(--spacing-md))] mx-auto max-sm:ml-[0px] max-sm:mr-[0px]"
            >
                <div className="flex justify-between items-center">
                {device.isMobile ?<div className="logo ">
                        <Link to="/">
                        <LogoIcon/> 
                        </Link>
                    </div> : <div className="logo pl-4">
                        <Link to="/">
                        <Logo/> 
                        </Link>
                    </div>}

                    <div
                        className="flex items-center mr-[var(--spacing-lg)] w-full lg:flex lg:w-auto lg:order-1 "
                        id="mobile-menu-2"
                    >
                        <Search />
                        {items.map((item, index) => (
                            <ul className="menu-items " key={index}>
                                <DropdownList
                                    title={item.title}
                                    data={item.children}
                                    queryParam={item.queryParam}
                                />
                            </ul>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: isLogin === true ? '28rem' : '23rem',
                        marginRight: 'var(--spacing-lg)',

                    }}
                    
                    className="flex justify-between items-center lg:order-2 mt-2 "
                >
                    {isLogin === true ? (
                        <>
                            <Popover
                                title={ContentModalHistoryTitle}
                                overlayStyle={{ maxWidth: '30%' }}
                                content={<ContentModalHistory />}
                                zIndex={9999}
                                className="flex max-lg:hidden "
                            >
                                <Link to="/foryou">
                                    <HistoryOutlined className="icon-login" />
                                </Link>
                            </Popover>
                        </>
                    ) : null}

                    <Language />

                    <Popover
                        title={<ContentModalVipTitle />}
                        overlayStyle={{ maxWidth: '20%' }}
                        content={<ContentModalVip />}
                        arrow={false}
                        zIndex={9999}
                        className="flex max-lg:hidden "
                    >
                        <Link to={'/VIPpackage'}>
                            <Button className="btn-vip" type="primary" icon={<CrownOutlined />}>
                                VIP
                            </Button>
                        </Link>
                    </Popover>

                    {isLogin === true ? (
                        <>
                            <div className="notification">
                                <BellOutlined className="notification-btn" />
                                <p className="number-notification">12</p>
                            </div>
                            <Popover
                                title={
                                    <div className="p-2 flex font-normal items-center justify-center border-b-[1px] border-[#989898]">
                                        <Avatar className="mr-4 mb-2" src={currentUser.avatarURL} />
                                        {currentUser.username}
                                    </div>
                                }
                                overlayStyle={{ maxWidth: '30%' }}
                                content={<ContentModalUser />}
                                zIndex={9999}
                                placement="bottomRight"
                            >
                                <Link
                                    to="/foryou/profile"
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {currentUser.avatarURL ? (
                                        <Avatar
                                            className="avatar"
                                            src={currentUser.avatarURL}
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                            size="default"
                                        />
                                    ) : (
                                        <Avatar
                                            className="avatar"
                                            icon={<UserOutlined />}
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                            size="default"
                                        />
                                    )}
                                </Link>
                            </Popover>
                            <Tooltip title="Đăng xuất">
                                <div className="icon-login">
                                    <LogoutOutlined onClick={handleLogout} />
                                </div>
                            </Tooltip>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button type="primary" className="flex items-center">
                                <LoginOutlined />
                                {t('Login')}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
