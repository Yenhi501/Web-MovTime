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
                    message: 'Đăng kí thành công',
                    description: 'Hãy kiểm tra mail để xác nhận.',
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
                    message: 'Đăng kí không thành công',
                    description: 'Email hoặc username đã tồn tại.',
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
            'Mật khẩu phải chứa chữ viết thường, chữ viết hoa, số và ký tự đặc biệt!',
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
                                <h1 className="form-header__large">Chào mừng bạn,</h1>
                                <p className="form-header__small">
                                    đăng kí tài khoản để sử dụng MovTime.
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
                                            message: 'Vui lòng nhập đúng định dạng E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập E-mail!',
                                        },
                                        {},
                                    ]}
                                >
                                    <Input className="register-form__item-input" />
                                </Form.Item>

                                <Form.Item
                                    className="register-form__item"
                                    name="username"
                                    label={<span style={{ color: 'white' }}>Tên đăng nhập</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đăng nhập!',
                                        },
                                    ]}
                                >
                                    <Input name="username" className="register-form__item-input" />
                                </Form.Item>

                                <Form.Item
                                    className="register-form__item"
                                    name="password"
                                    label={<span style={{ color: 'white' }}>Mật khẩu</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
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
                                            Xác nhận lại mật khẩu{' '}
                                        </span>
                                    }
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error('Mật khẩu không trùng khớp!'),
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
                                        label={<span style={{ color: 'white' }}>Ngày sinh</span>}
                                        {...config}
                                    >
                                        <DatePicker className="register-form__item-input" />
                                    </Form.Item>

                                    <Form.Item
                                        className="register-form__item"
                                        name="gender"
                                        label={<span style={{ color: 'white' }}>Giới tính</span>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn giới tính!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Chọn giới tính"
                                            style={{
                                                width: '180px',
                                                borderRadius: '7px',
                                                height: '42.5px',
                                            }}
                                            className="register-form__item-input"
                                        >
                                            <Option value="Male">Nam</Option>
                                            <Option value="Female">Nữ</Option>
                                            <Option value="Other">Khác</Option>
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
                                        Tôi đã đọc <a href="/">thỏa thuận</a>
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
                                        Đăng ký
                                    </Button>
                                    <div className="text-center mt-4">
                                        Bạn đã có tài khoản ? {}{' '}
                                        <Link className="form-signup" to="/login">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </Form.Item>

                                <Modal
                                    style={{ top: '12%' }}
                                    title="Trải nghiệm Tuyệt vời với Gói VIP!"
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
                                            Đăng ký với gói thường
                                        </Button>,
                                        <Link to="/VIPpackage" key="ok">
                                            <Button
                                                style={{
                                                    color: 'var(--contrast-color)',
                                                }}
                                                type="primary"
                                            >
                                                Đăng ký với gói VIP
                                            </Button>
                                        </Link>,
                                    ]}
                                >
                                    <p className="mt-4" style={{ color: 'var(--sub-color)' }}>
                                        "Yêu điện ảnh và muốn thưởng thức nhiều bộ phim hơn mỗi
                                        ngày? Gói VIP mang đến trải nghiệm tuyệt vời với hàng ngàn
                                        bộ phim đa dạng. Bạn sẽ được truy cập sớm vào bộ phim mới
                                        nhất và không bị gián đoạn bởi quảng cáo. Hãy trải nghiệm
                                        niềm đam mê điện ảnh một cách trọn vẹn với Gói VIP. Mua ngay
                                        và trải nghiệm sự khác biệt!"
                                    </p>
                                    <img
                                        alt=""
                                        style={{ marginTop: '20px' }}
                                        src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.15752-9/387518330_1316649055890049_4969429051850658745_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=3AaFCmb-HL0AX9SS7yH&_nc_ht=scontent.fdad3-1.fna&_nc_e2o=s&oh=03_AdTWCInJzTt8Lux8h3GOBsS8dic_h4u43l1LyWz66jh6NQ&oe=6552132E"
                                    />
                                    <p style={{ color: 'var(--sub-color)' }}>
                                        Việc bạn có thể xem ở chế độ HD (720p), Full HD (1080p),
                                        Ultra HD (4K) và HDR hay không phụ thuộc vào dịch vụ
                                        internet và khả năng của thiết bị. Không phải tất cả nội
                                        dung đều có sẵn ở mọi độ phân giải. Xem Điều khoản sử dụng
                                        của chúng tôi để biết thêm chi tiết.
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
