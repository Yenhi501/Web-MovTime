import { Button, Form, Input, Space, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Cookies from 'js-cookie';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUsername } from '../../../redux/isLoginSlice';
import { request } from '../../../utils/request';
import './index.scss';

export type FormChangePassword = {
    onCancel?: React.MouseEventHandler<HTMLElement> | undefined;
    onSubmit?: React.MouseEventHandler<HTMLElement> | undefined;
    open?: boolean;
};
export const FormChangePassword = ({ onCancel, onSubmit, open }: FormChangePassword) => {
    const [form] = useForm();

    // useEffect(() => {
    //     form.resetFields();
    // }, [open]);
    const dispatch = useDispatch();
    const handleLogout = useCallback(() => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('username');
        dispatch(setIsLogin(false));
        dispatch(setUsername(null));
    }, [dispatch]);
    const onSubmitForm = (data: { oldPassword: string; newPassword: string }) => {
        const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
        const changePassword = async () => {
            try {
                const response = await request.post('auth/change-password', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.statusText === 'OK') {
                    // open = !open;
                    notification.success({
                        message: 'Thành công',
                        description: 'Đổi mật khẩu thành công.',
                    });
                    await handleLogout();
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error(error);
                notification.error({
                    message: 'Thất bại',
                    description: 'Đổi mật khẩu không thành công.',
                });
            }
        };
        changePassword();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            }}
        >
            <Form.Item
                name="oldPassword"
                label="Mật khẩu hiện tại"
                rules={[{ required: true, message: 'Cần nhập mật khẩu cũ' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[{ required: true, message: 'Cần nhập mật khẩu mới' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="confirmNewPassword"
                label="Xác nhận mật khẩu mới"
                rules={[
                    { required: true, message: 'Cần xác nhận mật khẩu mới' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Mật khẩu xác nhận không khớp');
                        },
                    }),
                ]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item className="btn-form-container">
                <Space>
                    <Button type="primary" className="user-profile-btn" onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        className="user-profile-btn"
                        onClick={() => {
                            form.validateFields()
                                .then(() => {
                                    const formValues = form.getFieldsValue();
                                    delete formValues.confirmNewPassword;
                                    onSubmitForm(formValues);
                                })
                                .catch((errorInfo) => {
                                    console.error(errorInfo);
                                });
                        }}
                        htmlType="submit"
                    >
                        Sửa
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
