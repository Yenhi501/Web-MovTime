import { LoadingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Space, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RcFile, UploadFile } from 'antd/es/upload';
import axios from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { CurrentUser } from '../../../model/user';
import { endpoint } from '../../../utils/baseUrl';
import { t } from '../../../utils/i18n';
import { request } from '../../../utils/request';
import { UploadAvtCircle } from '../../upload-avt-circle';

type FieldType = {
    dateOfBirth: string;
    gender: string;
};
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const { Option } = Select;
export type FormEditUser = {
    onCancel?: React.MouseEventHandler<HTMLElement> | undefined;
    onSubmit?: React.MouseEventHandler<HTMLElement> | undefined;
    open?: boolean;
    data: CurrentUser;
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setHasReloaded: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FormEditUser = ({
    onCancel,
    onSubmit,
    open,
    data,
    setIsOpenEdit,
    setHasReloaded,
}: FormEditUser) => {
    const [previewImage, setPreviewImage] = useState<string>(data.avatarURL);
    const [form] = useForm();
    const [uploadDone, setUploadDone] = useState(true);

    const handleChange = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        if (file.originFileObj) {
            upload(file.originFileObj);
        }
    };
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const upload = async (file: File) => {
        setUploadDone(false);

        const presignedUrlResponse = await axios.get(
            `${endpoint}/api/user/get-presign-url-to-upload-avatar`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        if (!presignedUrlResponse.data.data) {
            console.error('Presigned URL not received from the server.');
            return;
        }
        const presignedUrl = presignedUrlResponse.data.data;
        await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });
        await axios.post(
            `${endpoint}/api/user/cloudfront/clear-cache`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        await new Promise((resolve) => {
            resolve(true);
        }).then(() => {
            setUploadDone(true);
        });
    };

    const editProfileUser = async (data: FieldType) => {
        try {
            await request.put(
                'user/update-self-information',
                {
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            setIsOpenEdit(false);
            setHasReloaded(true);
        } catch (error) {
            console.error(error);
        }
    };
    const onFinish = (data: FieldType) => {
        editProfileUser(data);
    };

    return (
        <Form
            key={data.avatarURL}
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            initialValues={{
                avatar: data.avatarURL,
                username: data.username,
                email: data.email,
                dateOfBirth: dayjs(data.dateOfBirth),
                gender: data.gender,
            }}
            onFinish={onFinish}
        >
            <Form.Item name="avatar">
                <Spin spinning={!uploadDone} indicator={<LoadingOutlined />}>
                    <UploadAvtCircle
                        onChange={(info) => {
                            handleChange(info.file);
                        }}
                        previewImage={previewImage}
                    />
                </Spin>
            </Form.Item>
            <Form.Item name="username" label="Tên người dùng" rules={[{ required: false }]}>
                <Input value={data.username} readOnly />
            </Form.Item>
            <Form.Item name="email" label="Email">
                <Input value={data.email} readOnly />
            </Form.Item>
            <Form.Item name="dateOfBirth" label={t('DateOfBirth')}>
                <DatePicker className="form-date-picker" />
            </Form.Item>
            <Form.Item name="gender" label={<span style={{ color: 'white' }}>{t('Sex')}</span>}>
                <Select
                    value={data.gender}
                    style={{
                        width: '100%',
                        height: '32px',
                    }}
                    className="form-date-picker"
                >
                    <Option value="Male">Nam</Option>
                    <Option value="Female">Nữ</Option>
                    <Option value="Other">{t('Other')}</Option>
                </Select>
            </Form.Item>
            <Form.Item className="btn-form-container">
                <Space>
                    <Button type="primary" className="user-profile-btn" onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button type="primary" className="user-profile-btn" htmlType="submit">
                        Lưu
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
