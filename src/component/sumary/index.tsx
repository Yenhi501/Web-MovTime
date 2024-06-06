import { Button, Modal } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useToken } from '../../hooks/useToken';
import { useAppSelector } from '../../redux/hook';
import { endpoint } from '../../utils/baseUrl';
import { getCurrentDateString } from '../../utils/getCurrentDate';
import { getNextDateByMonth } from '../../utils/getNextDateByMonth';
import { t } from '../../utils/i18n';
import { TermPackage } from '../term-package';
import './index.scss';

interface SummaryProps {
    selectedTerm: TermPackage | null;
    selectedMethod: number;
    subscriptionInfoId: number;
    discount: number;
}

const methodShowMap: Record<number, string> = {
    1: 'Paypal',
    2: 'VNPay',
};

const startDate = getCurrentDateString();
export const Summary: React.FC<SummaryProps> = ({
    subscriptionInfoId = 0,
    selectedMethod,
    discount,
    selectedTerm = { id: 0, value: 0, price: 0 },
}) => {
    const [linkRedirect, setLinkRedirect] = useState('');
    const { namePackage, durationValue } = useAppSelector((state) => state.VIPPayment);
    const { subscriptionTypeId, accessToken } = useToken();
    const duration = selectedTerm?.value || 0;
    const totalPrice = selectedTerm?.price || 0;
    const [endDate, setEndDate] = useState(getNextDateByMonth(duration));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    useEffect(() => {
        const newDate = getNextDateByMonth(duration);
        setEndDate(newDate);
    }, [selectedTerm]);

    const handleRecoverDate = () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        return getCurrentDateString(newDate);
    };

    const postOrder = async () => {
        return await axios
            .post(
                `${endpoint}/api/payments/paypal`,
                {
                    subscriptionInfoId: subscriptionInfoId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            .then((res) => {
                setLinkRedirect(res.data.data);
                window.location.href = res.data.data; 
            })
            .catch((error) => console.log(error));
    };

    const paymentVNPay = async () => {
        await axios
            .post(
                `${endpoint}/api/payments/vn-pay`,
                {
                    ipAddress: '127.0.0.1',
                    subscriptionInfoId: subscriptionInfoId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            .then((response) => {
                setLinkRedirect(response.data.data.url);
                window.location.href = response.data.data.url; 
            })
            .catch((err) => console.log(err));
    };

    const handleConfirmPayment = () => {
        if (!accessToken) {
            setIsLoginModalVisible(true);
        } else if (subscriptionInfoId !== 0) {
            if (selectedMethod === 2) {
                paymentVNPay();
            } else if (selectedMethod === 1) {
                postOrder();
            }
        }
    };

    return (
        <div className="wrapper-summary">
            <Modal
                title="Thông báo đăng ký"
                visible={isLoginModalVisible}
                onCancel={() => setIsLoginModalVisible(false)}
                footer={[
                    <Button key="link" href="/">
                        Hủy bỏ
                    </Button>,
                    <Button key="link" href="/login" type="primary">
                        Đăng nhập
                    </Button>,
                ]}
            >
                Vui lòng đăng nhập để tiếp tục thanh toán.
            </Modal>
            <Modal
                title="Thông báo đăng ký"
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={[
                    <Button key="back" onClick={() => setIsOpenModal(false)}>
                        Hủy bỏ
                    </Button>,
                    <Button key="link" onClick={handleConfirmPayment} type="primary">
                        Tiếp tục
                    </Button>,
                ]}
            >
                Hiện tại bạn đang ở gói {subscriptionTypeId === 2 ? 'Tiêu chuẩn' : 'Cao cấp'}.{' '}
                <span className="text-red-600">Nếu bạn tiếp tục hoàn thành đăng ký</span>, gói hiện
                tại của bạn sẽ bị xóa và thời gian hiệu lực của gói mới nhất sẽ được áp dụng!
            </Modal>
            <div className="title-summary">Chi tiết thanh toán</div>
            <div className="information">
                <div className="term-package">
                    <div className="name-package">
                        <div className="">{t('PackageName')}</div>
                        <div className="value">{namePackage}</div>
                    </div>
                    <div className="term">
                        <div className="">Thời hạn gói</div>
                        <div className="value">
                            {durationValue >= 10 ? '' : 0}
                            {durationValue || 1} tháng
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-neutral-300" />
                <div className="time">
                    <div className="time-start">
                        <div className="">Ngày hiệu lực</div>
                        <div className="value">{startDate}</div>
                    </div>
                    <div className="time-start">
                        <div className="">Sử dụng đến</div>
                        <div className="value">{moment(endDate).format('DD/MM/YYYY')}</div>
                    </div>
                    <div className="time-end">
                        <div className="">Kỳ thanh toán tiếp theo</div>
                        <div className="value">{handleRecoverDate()}</div>
                    </div>
                </div>

                <hr className="my-2 border-neutral-300" />
                <div className="price-package">
                    <div className="price">
                        <div className="">Trị giá</div>
                        <div className="value">
                            {selectedTerm?.price.toLocaleString('it-IT') || '---'}&nbsp;₫
                        </div>
                    </div>
                    <div className="price">
                        <div className="">Giảm giá</div>
                        <div className="value">
                            {discount !== 0 ? discount * 100 : '---'}&nbsp;%
                        </div>
                    </div>
                </div>
                <hr className="my-2 border-neutral-300" />
                <div className="method">
                    <div className="method-payment">
                        <div className="">Phương thức thanh toán</div>
                        <div className="value">{methodShowMap[selectedMethod]}</div>
                    </div>
                </div>
                <hr className="my-2 border-neutral-300" />
                <div className="total-price">
                    <div className="">Thành tiền</div>
                    <div className="value-1">
                        {totalPrice.toLocaleString('it-IT') || '---'}
                        &nbsp;₫
                    </div>
                </div>
                <div className="note">
                    Bằng việc xác nhận, bạn xác định đã đọc và đồng ý với{' '}
                    <a
                        href="#"
                        style={{
                            color: 'var(--primary-color)',
                            fontWeight: '500',
                        }}
                    >
                        Hợp đồng và Chính sách{' '}
                    </a>
                    của MOVTIME.
                </div>
            </div>
            {subscriptionTypeId === 1 ? (
                <Button className={`btn-confirm flex`} type="primary" onClick={handleConfirmPayment}>
                    Xác nhận
                </Button>
            ) : (
                <Button
                    className={`btn-confirm flex`}
                    type="primary"
                    onClick={() => setIsOpenModal(true)}
                >
                    Xác nhận
                </Button>
            )}
        </div>
    );
};
