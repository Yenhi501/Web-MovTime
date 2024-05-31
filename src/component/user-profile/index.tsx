import { Button, Descriptions, DescriptionsProps, Spin, notification } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { CurrentUser, defaultCurrentUser } from '../../model/user';
import { request } from '../../utils/request';
import { ModalUser } from '../modal-user';
import { FormChangePassword } from '../modal-user/form-change-password';
import { FormEditUser } from '../modal-user/form-edit-user';
import './index.scss';
import { useToken } from '../../hooks/useToken';
import { t } from '../../utils/i18n';

export const UserProfile = () => {
    const moment = require('moment');
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState<boolean>(false);
    //api currentUser
    const { accessToken } = useToken();
    const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultCurrentUser);
    const [hasReloaded, setHasReloaded] = useState(false);

    const fetchDataCurrentUser = async () => {
        try {
            request
                .get('user/get-self-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    const userId = {
                        ...res.data,
                        avatarURL: res.data.avatarURL,
                    };
                    setCurrentUser(userId);
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.error(error);
        }
    };
    // useEffect(() => {
    //     fetchDataCurrentUser();
    // }, [isOpenEdit]);
    useEffect(() => {
        fetchDataCurrentUser();

        if (isOpenEdit === false && hasReloaded === true) {
            window.location.reload();
            setHasReloaded(false);
        }
    }, [isOpenEdit, hasReloaded]);

    const items2: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Email',
            children: currentUser.email,
        },
        {
            key: '2',
            label: t('DateOfBirth'),
            children: moment(currentUser.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            key: '3',
            label: t('Sex'),
            children: currentUser.gender,
        },
    ];
    const [loadingRemoveAvatar, setLoadingRemoveAvatar] = useState(false);

    const handleRemoveAvatar = async () => {
        try {
            setLoadingRemoveAvatar(true);

            const response = await request.delete('user/remove-avatar', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response?.status === 204 || response?.status === 200) {
                notification.success({
                    message: 'Xóa Avatar thành công',
                    description: 'Avatar đã được xóa thành công.',
                    placement: 'topRight',
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: `Không thể xóa avatar. Status: ${response.status}`,
                    placement: 'topRight',
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoadingRemoveAvatar(false);
                window.location.reload();
            }, 3200);
        }
    };

    return (
        <div className="user-profile-container">
            <ModalUser
                open={isOpenEdit}
                onCancel={() => {
                    setIsOpenEdit(false);
                    setHasReloaded(true);
                }}
            >
                <FormEditUser
                    data={currentUser}
                    setIsOpenEdit={setIsOpenEdit}
                    setHasReloaded={setHasReloaded}
                    onCancel={() => setIsOpenEdit(false)}
                />
            </ModalUser>
            <ModalUser open={isOpenChangePassword} onCancel={() => setIsOpenChangePassword(false)}>
                <FormChangePassword onCancel={() => setIsOpenChangePassword(false)} />
            </ModalUser>
            <div key={currentUser.avatarURL} className="user-profile-general">
                <Spin spinning={loadingRemoveAvatar} size="large">
                    <Avatar
                        src={currentUser.avatarURL}
                        srcSet=""
                        size={160}
                        className="user-profile-avt"
                    />
                </Spin>
                <Title className="user-profile-username" level={3}>
                    {currentUser.username}
                </Title>
            </div>
            <div className="user-profile-detail">
                <div className="user-profile-detail-content-container">
                    <Descriptions
                        items={items2}
                        className="user-profile-detail-content"
                        contentStyle={{ color: 'var(--contrast-color)' }}
                        labelStyle={{ color: 'var(--sub-color)' }}
                        column={3}
                        layout="vertical"
                    />
                    <div className="btn-container !mt-20">
                        <Button
                            type="primary"
                            className="user-profile-btn"
                            onClick={() => setIsOpenChangePassword(true)}
                        >
                            {t('ChangePassword')}
                        </Button>
                        <Button
                            type="primary"
                            className="user-profile-btn"
                            onClick={() => setIsOpenEdit(true)}
                        >
                            {t('Edit')}
                        </Button>
                        <Button
                            type="primary"
                            className="user-profile-btn"
                            onClick={handleRemoveAvatar}
                        >
                            {t('DeleteAvatar')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
