import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { request } from '../../utils/request';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface GoogleAuthData {
    code: string;
    scope?: string | null;
    authuser?: string | null;
    prompt?: string | null;
}

const LoginGG = () => {
    const navigate = useNavigate();
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const authData: GoogleAuthData = {
            code: urlParams.get('code') || '',
            scope: urlParams.get('scope'),
            authuser: urlParams.get('authuser'),
            prompt: urlParams.get('prompt'),
        };

        const encodedParams = new URLSearchParams();
        Object.entries(authData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                encodedParams.append(key, value);
            }
        });

        try {
            const response: AxiosResponse<{ token: string }> = await axios.get(
                `http://localhost:8000/api/auth/google/callback?${encodedParams.toString()}`,
            );

            let refreshToken = response.data.token;

            if (refreshToken) {
                setRefreshToken(refreshToken);
                request
                    .post('/auth/get-access-token', { refreshToken: refreshToken })
                    .then((res) => {
                        let accessToken = JSON.stringify(res.data.result.token.accessToken);
                        Cookies.set('accessToken', accessToken, { expires: 1 });
                        Cookies.set('refreshToken', refreshToken, { expires: 1 });
                        setTimeout(() => {
                            navigate('/');
                        }, 300);
                    })
                    .catch((err) => {
                        console.log('Error refresh', err);
                        if (err.response && err.response.status === 401) {
                            Cookies.remove('accessToken');
                            Cookies.remove('refreshToken');
                        }
                    });
            } else {
                console.log('Refresh token not found.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <div style={{ height: '180px' }}></div>;
};

export default LoginGG;
