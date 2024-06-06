import {
    Button,
    Checkbox,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    Spin,
    notification,
} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import { endpoint } from '../../utils/baseUrl';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { t } from '../../utils/i18n';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 26 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const config = {
    rules: [
        {
            type: 'object' as const,
            required: true,
            message: 'Please select time!',
        },
    ],
};
export const Register: React.FC = () => {
    const moment = require('moment');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };
    const sendActive = async (values: any) => {
        try {
            const data = { identifier: values.email };

            const response = await axios.post(`${endpoint}/api/auth/active-user`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'Ok!') {
                notification.info({
                    message: `${t('SigninSuccess')}`,
                    description: `${t('CheckMail')}`,
                });
            }
        } catch (error) {
            console.error('Error sending data to API:', error);
        }
    };

    const sendDataToAPI = async (values: any) => {
        try {
            values.dateOfBirth = moment(values.datePicker).format('YYYY-MM-DD HH:mm:ss.SSSZ');

            const response = await axios.post(`${endpoint}/api/auth/register`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                sendActive(values);
                form.resetFields();
                navigate('/login');
            } else {
                console.error('Error registering user:', response.data);
            }
        } catch (error: any) {
            if (error.response.status === 409) {
                notification.warning({
                    message: `${t('LoginNoSuccess')}`,
                    description:`${t('EmailValid')}`,
                });
            }
        }
    };

    const onFinish = (values: any) => {
        sendDataToAPI(values);
    };
    const handleRegularPackageRegister = async () => {
        try {
            await form.validateFields();
            handleModalOpen();
        } catch (errorInfo) {
            console.log('Validation failed:', errorInfo);
        }
    };

    const passwordValidator = (_: any, value: any) => {
        if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(
            `${t('ConditionPassword')}`,
        );
    };
    return (
        <ConfigProvider
            theme={{
                token: {},
            }}
        >
            <Spin
                indicator={
                    <LoadingOutlined style={{ fontSize: 36 }} spin className="text-red-600" />
                }
                spinning={isLoading}
            >
                <div className="register">
                    <div className="form-list">
                        <Link to="/">
                            <div className="header-logo">
                                <Logo />
                            </div>
                        </Link>
                        <div className="form-img">
                            <img
                                src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/a36e826e-5a25-480d-ab1c-4eebd385b7cc/VN-vi-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                                alt=""
                            />
                        </div>
                        <div className="register-form">
                            <div className="register-form__header">
                                <h1 className="form-header__large">{t('Welcome')}</h1>
                                <p className="form-header__small">
                                {t('SingupMovTime')}
                                </p>
                            </div>

                            <Form
                                className="register-form__group"
                                {...formItemLayout}
                                form={form}
                                layout="vertical"
                                name="register"
                                onFinish={onFinish}
                                style={{ maxWidth: 600 }}
                                scrollToFirstError
                                encType="multipart/form-data"
                            >
                                <Form.Item
                                    className="register-form__item"
                                    name="email"
                                    label={<span style={{ color: 'white' }}>Email</span>}
                                    rules={[
                                        {
                                            type: 'email',
                                            message: `${t('FormatEmail')}`,
                                        },
                                        {
                                            required: true,
                                            message: `${t('InputEmail')}`,
                                        },
                                        {},
                                    ]}
                                >
                                    <Input className="register-form__item-input" />
                                </Form.Item>

                                <Form.Item
                                    className="register-form__item"
                                    name="username"
                                    label={<span style={{ color: 'white' }}>{t('Username')}</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message:`${t('InputUsername')}`,
                                        },
                                    ]}
                                >
                                    <Input name="username" className="register-form__item-input" />
                                </Form.Item>

                                <Form.Item
                                    className="register-form__item"
                                    name="password"
                                    label={<span style={{ color: 'white' }}>{t('Password')}</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t('InputPassword')}`,
                                        },
                                        {
                                            validator: passwordValidator,
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password className="register-form__item-input" />
                                </Form.Item>
                                {/* <p className=" !mt-[-20px] mb-4 text-[11px] italic text-red-700">
                            Mật khẩu phải chứa đầy đủ chữ viết thường, chữ viết hoa, số, ký tự đặc
                            biệt!
                        </p> */}
                                <Form.Item
                                    className="register-form__item"
                                    name="confirm"
                                    label={
                                        <span style={{ color: 'white' }}>
                                            {t('PasswordAG')}
                                        </span>
                                    }
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t('InputPasswordAgain')}`,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(`${t('ErrPassword')}`),
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className="register-form__item-input" />
                                </Form.Item>
                                <div className="register-form__confirm">
                                    <Form.Item
                                        style={{ marginRight: '20px' }}
                                        className="register-form__item"
                                        name="date-picker"
                                        label={<span style={{ color: 'white' }}>{t('DateOfBirth')}</span>}
                                        {...config}
                                    >
                                        <DatePicker className="register-form__item-input" />
                                    </Form.Item>

                                    <Form.Item
                                        className="register-form__item"
                                        name="gender"
                                        label={<span style={{ color: 'white' }}>{t('Sex')}</span>}
                                        rules={[
                                            {
                                                required: true,
                                                message: `${t('Genre')}`,
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder= {t('GenreChoose')}
                                            style={{
                                                width: '180px',
                                                borderRadius: '7px',
                                                height: '42.5px',
                                            }}
                                            className="register-form__item-input"
                                        >
                                            <Option value="Male">{t('Male')}</Option>
                                            <Option value="Female">{t('Female')}</Option>
                                            <Option value="Other">{t('Other')}</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    style={{ marginLeft: '-180px' }}
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                          new Error('Should accept agreement'),
                                                      ),
                                        },
                                    ]}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox name="check" className="register-form__item-checkbox">
                                    {t('IRead')} <a href="/">{t('Agree')}</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item
                                    className="register-form__button"
                                    {...tailFormItemLayout}
                                >
                                    <Button
                                        htmlType="button"
                                        style={{
                                            borderColor: 'var(--primary-color)',
                                            color: 'var(--contrast-color)',
                                            backgroundColor: 'var(--primary-color)',
                                        }}
                                        onClick={handleRegularPackageRegister}
                                    >
                                        {t('Register')}
                                    </Button>
                                    <div className="text-center mt-4">
                                    {t('YouHave')} {}{' '}
                                        <Link className="form-signup" to="/login">
                                        {t('Login')}
                                        </Link>
                                    </div>
                                </Form.Item>

                                <Modal
                                    style={{ top: '12%' }}
                                    title={t('title')}
                                    visible={showModal}
                                    onOk={handleModalClose}
                                    onCancel={handleModalClose}
                                    width={800}
                                    footer={[
                                        <Button
                                            type="primary"
                                            style={{ marginRight: '10px' }}
                                            htmlType="submit"
                                            onClick={() => {
                                                handleModalOpen();
                                                form.validateFields()
                                                    .then((values) => {
                                                        sendDataToAPI(values);
                                                        setIsLoading(true);
                                                        handleModalClose();
                                                    })
                                                    .catch((errorInfo) => {
                                                        setIsLoading(false);
                                                        console.log(
                                                            'Validation failed:',
                                                            errorInfo,
                                                        );
                                                    });
                                            }}
                                            key="cancel"
                                        >
                                            {t('LoginNormal')}
                                        </Button>,
                                        <Link to="/VIPpackage" key="ok">
                                            <Button
                                                style={{
                                                    color: 'var(--contrast-color)',
                                                }}
                                                type="primary"
                                            >
                                                {t('LoginVIP')}
                                            </Button>
                                        </Link>,
                                    ]}
                                >
                                    <p className="mt-4" style={{ color: 'var(--sub-color)' }}>
                                    {t('Desc1')}
                                    </p>
                                    <img
                                        alt=""
                                        style={{ marginTop: '20px' }}
                                        src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.15752-9/387518330_1316649055890049_4969429051850658745_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=3AaFCmb-HL0AX9SS7yH&_nc_ht=scontent.fdad3-1.fna&_nc_e2o=s&oh=03_AdTWCInJzTt8Lux8h3GOBsS8dic_h4u43l1LyWz66jh6NQ&oe=6552132E"
                                    />
                                    <p style={{ color: 'var(--sub-color)' }}>
                                    {t('Desc2')}
                                    </p>
                                </Modal>
                            </Form>
                        </div>
                    </div>
                </div>
            </Spin>
        </ConfigProvider>
    );
};
