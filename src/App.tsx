import { Avatar, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, useLocation } from 'react-router-dom';
import './app.scss';
import ActiveUser from './component/active-user';
import Actor from './component/actor';
import { Botchat } from './component/botchat';
import { Director } from './component/director';
import { FilmDetail } from './component/film-detail';
import { Footer } from './component/footer';
import { LoginForget } from './component/forget-password';
import { Header } from './component/header';
import { Login } from './component/login';
import LoginGG from './component/loginGG';
import { NewPassword } from './component/new-password';
import { Register } from './component/register';
import { useToken } from './hooks/useToken';
import { Bill } from './page/bill';
import { HomePage } from './page/home/index';
import { LayoutUser } from './page/layout-user';
import { Payment } from './page/payment';
import { SearchPage } from './page/search';
import { VIPPackage } from './page/vip-package';
import { WatchingPage } from './page/watching';
import { useAppDispatch } from './redux/hook';
import { setIsLogin } from './redux/isLoginSlice';
import { refreshToken } from './utils/refreshToken';
import { request } from './utils/request';

const locationMap: Record<string, string> = {
    '/VIPpackage': 'hidden',
    '/payment': 'hidden',
    '/bill': 'hidden',
    '/newpassword': 'hidden',
    '/reset-password': 'hidden',
};

export const App = () => {
    const location = useLocation();
    const timeRefreshToken = 1000 * 29 * 60; /*29m*/
    const { accessToken } = useToken();
    const dispatch = useAppDispatch();

    //botchat
    const [open, setOpen] = useState(false);

    const showBotchat = () => {
        setOpen(true);
    };

    const closeBotchat = () => {
        setOpen(false);
    };

    const { pathname } = useLocation();

    const saveWatchingHistory = (episodeId: number, duration: number) => {
        request
            .get(`user/add-movie-history?episodeId=${episodeId}&duration=${duration}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        refreshToken();
        if (accessToken !== '') {
            dispatch(setIsLogin(true));
        }
        const timer = setInterval(refreshToken, timeRefreshToken);
        return () => clearInterval(timer);
    }, [accessToken]);

    useEffect(() => {
        const jsonDurationInfo = localStorage.getItem('durationInfo') || JSON.stringify('');
        const durationInfo: { episodeId: number; duration: number } = JSON.parse(jsonDurationInfo);
        if (durationInfo.episodeId !== 0 && durationInfo.duration !== 0) {
            saveWatchingHistory(durationInfo.episodeId, durationInfo.duration);
        }
    }, [pathname]);

    const helmetContext = {};

    return (
        <HelmetProvider context={helmetContext}>
            <div className="wrapper">
                <Header className={`${locationMap[location.pathname]}`} />

                <div className="botchat relative bottom-3 !right-4">
                    <Tooltip title="Xin chào, MovTime có thể giúp gì cho bạn?" placement="left">
                        <Avatar
                            size={54}
                            src="https://www.shutterstock.com/image-vector/artificial-ai-chat-bot-icon-600nw-2281213775.jpg"
                            onClick={showBotchat}
                            style={{ backgroundColor: 'white' }}
                        />
                    </Tooltip>
                </div>
                {open && <Botchat onClose={closeBotchat} />}
                <div className="wrapper-app-container">
                    <Routes>
                        <Route path="" element={<HomePage />} />
                        <Route path="/search/*" element={<SearchPage />} />
                        <Route path="/movie/:movieId/:episodeId" element={<WatchingPage />} />
                        <Route path="/foryou/*" element={<LayoutUser />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/payment/:idPackage/*" element={<Payment />} />
                        <Route path="/VIPpackage" element={<VIPPackage />} />
                        <Route path="/bill" element={<Bill />} />
                        <Route path="/director/:directorId" element={<Director color="white" />} />
                        <Route path="/actor/:actorId" element={<Actor color="white" />} />
                        <Route path="/movie/:id" element={<FilmDetail />} />
                        <Route path="/reset-password" element={<NewPassword />} />
                        <Route path="/forget" element={<LoginForget />} />
                        <Route path="/google" element={<LoginGG />} />
                        <Route path="/active-user" element={<ActiveUser />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </HelmetProvider>
    );
};
