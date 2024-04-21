import { Avatar, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './app.scss';
import { HelmetProvider } from 'react-helmet-async';
import { HomePage } from './page/home';

export const App = () => {
    const { pathname } = useLocation();

    useEffect(() => {}, [pathname]);

    const helmetContext = {};

    return (
        <HelmetProvider context={helmetContext}>
            <div className="wrapper">
                <div className="wrapper-app-container">
                    <Routes>
                        <Route path="" element={<HomePage />} />
                    </Routes>
                </div>
            </div>
        </HelmetProvider>
    );
};
