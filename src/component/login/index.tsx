import { Button, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import { setIsLogin, setUsername } from '../../redux/isLoginSlice';
import { endpoint } from '../../utils/baseUrl';
import './index.scss';
import { t } from '../../utils/i18n';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { hash } = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onFinish = (data: FieldType) => {
        setLoading(true);

        axios
            .post(`${endpoint}/api/auth/login`, data)
            .then((response) => {
                let accessToken = JSON.stringify(response.data.result.token.accessToken);
                let refreshToken = JSON.stringify(response.data.result.token.refreshToken);
                setLoading(false);
                if (response.status === 200) {
                    notification.success({
                        message: `${t('LoginSuccess')}`,
                        description:`${t('titleLogin')}`,
                        placement: 'bottomRight',
                    });

                    dispatch(setIsLogin(true));

                    if (data.username) {
                        dispatch(setUsername(data.username));
                        Cookies.set('username', data.username, { expires: 1, secure: true });
                    }

                    Cookies.set('accessToken', accessToken, { expires: 1 });
                    Cookies.set('refreshToken', refreshToken, { expires: 1 });
                    if (hash !== '') {
                        navigate(`/movie/${hash.split('#')[1]}`);
                    } else {
                        navigate('/');
                    }
                } else {
                    if (response.data.error) {
                        notification.error({
                            message: `${t('LoginFail')}`,
                            description: `${t('EmailErr')}`,
                        });
                    }
                }
            })
            .catch(function (err) {
                setLoading(false);
                console.error(err);
                // if (err.response.data.status === 'Unauthorized') {
                //     // axios.post(`${endpoint}/api/auth/login`, data)
                //     window.location.href = 'https://mail.google.com/';
                // }
                notification.error({
                    message:  `${t('LoginFail')}`,
                    description:  `${t('EmailErr')}`,
                });
            });
    };
    const onSuccessGG = () => {
        window.location.href = 'http://movtime-movies.eastasia.cloudapp.azure.com:8000/api/auth/google';
        // notification.success({
        //     message: 'Đăng nhập thành công',
        //     description: 'Chúc mừng, bạn đã đăng nhập thành công',
        // });

        // dispatch(setIsLogin(true));
        // console.log(response);
        // if (response.wt.cu) {
        //     dispatch(setUsername(response.wt.cu));
        //     Cookies.set('username', response.wt.cu, { expires: 1, secure: true });
        // }
        // Cookies.set('accessToken', response.accessToken, { expires: 1 });
        // // Cookies.set('refreshToken', refreshToken, { expires: 1 });
        // console.log(response.accessToken);
        // navigate('/');
    };

    return (
        <div className="login">
            <div className="form-list">
                <div className="header-logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="form-img">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/a36e826e-5a25-480d-ab1c-4eebd385b7cc/VN-vi-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                        alt=""
                    />
                </div>
                <div className="form-info">
                    <div className="form-header !ml-3">
                        <h1 className="form-header__large"> {t('Welcome')} </h1>
                        <p className="form-header__small">
                        {t('LoginMovTime')}
                        </p>
                    </div>
                    <Form
                        className="form-group"
                        name="basic"
                        labelCol={{ span: 16, color: 'white' }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="form-item">
                            <Form.Item<FieldType>
                                label={<span style={{ color: 'white' }}>{t('User/Email')}</span>}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('InputUser/Email')}`,
                                    },
                                ]}
                            >
                                <Input
                                    className="form-input"
                                    style={{
                                        width: '330px',
                                        height: '44px',
                                    }}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label={<span style={{ color: 'white' }}>{t('Password')}</span>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: `${t('InputPassword')}`,
                                },
                            ]}
                        >
                            <Input.Password
                                className="form-input"
                                style={{
                                    width: '330px',
                                    height: '44px',
                                }}
                            />
                        </Form.Item>

                        <div className="flex justify-between">
                            <Form.Item<FieldType>
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{ span: 32 }}
                                className="flex justify-between"
                            >
                                <Checkbox style={{ color: 'white' }}>{t('SavePassword')}</Checkbox>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 32 }}>
                                <a
                                    className="login-form-forgot !text-[14px] mr-5 "
                                    style={{ color: 'var(--primary-color)' }}
                                    href="forget"
                                >
                                    {t('ForgotPassword')}
                                </a>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item>
                                <Button
                                    className="form-btn-login !h-[44px]"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    {t('Login')}
                                </Button>
                            </Form.Item>
                            <div className="!flex gap-[17px]">
                                <Button
                                    icon={
                                        <img
                                            src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
                                            alt="Google Icon"
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                marginRight: '16px',
                                                marginLeft: '8px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    }
                                    className="login-facebook flex sm:basis-[43%] basis-[46%]"
                                    onClick={onSuccessGG}
                                >
                                    Google
                                </Button>

                                <Button
                                    icon={
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1200px-2023_Facebook_icon.svg.png"
                                            alt="Facebook Icon"
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '16px',
                                                marginLeft: '8px',
                                            }}
                                        />
                                    }
                                    className="login-facebook flex sm:basis-[43%] basis-[46%] "
                                >
                                    Facebook
                                </Button>
                            </div>
                            <div className="text-center mt-4 text-white !ml-[-18px]">
                            {t('YouNoHave')}{}{' '}
                                <Link className="form-signup" to="/register">
                                {t('Register')}
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
