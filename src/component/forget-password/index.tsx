import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import './index.scss';
import axios from 'axios';
import { endpoint } from '../../utils/baseUrl';

type FieldType = {
    email?: string;
};

export const LoginForget: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const onFinish = (data: FieldType) => {
        setLoading(true);
        axios
            .post(`${endpoint}/api/auth/forgot-password`, data)
            .then((response) => {
                if (response.data.status == 'Ok!') {
                    window.location.href = 'https://mail.google.com/';
                }
            })
            .catch(function (err) {
                setLoading(false);
                console.error(err);
                notification.error({
                    message: 'Không thành công',
                    description: 'Email của bạn chưa được đăng kí tài khoản.',
                });
            });
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
                <div className="form-info-forgot">
                    <div className="form-header !ml-2">
                        <h1 className="form-header__large "> Chào mừng bạn, </h1>
                        <p className="form-header__small">nhập email để lấy lại tài khoản.</p>
                    </div>
                    <Form
                        form={form}
                        className="form-group mt-20"
                        name="basic"
                        labelCol={{ span: 8, color: 'white' }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="form-item">
                            <Form.Item<FieldType>
                                name="email"
                                className="mb-12"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Nhập đúng định dạng email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Nhập email để tiếp tục!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập email xác nhận"
                                    className="form-input"
                                    style={{
                                        width: '330px',
                                        height: '44px',
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                className="form-btn-login !h-[46px]"
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                        <div className="form-change !mt-2">
                            Bạn mới sử dụng MovTime ? {}{' '}
                            <Link className="form-signup" to="/register">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
