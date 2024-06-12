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
import { packageTranslationMap } from '../header/constant';
import { getCurrentLanguage } from '../../utils/localization';

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
    const [isLoading, setIsLoading] = useState(false); 

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
        try {
            setIsLoading(true); 
            const res = await axios.post(
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
            );
            setLinkRedirect(res.data.data);
            window.location.href = res.data.data; 
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); 
        }
    };

    const paymentVNPay = async () => {
        try {
            setIsLoading(true); 
            const response = await axios.post(
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
            );
            setLinkRedirect(response.data.data.url);
            window.location.href = response.data.data.url; 
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000); 
        }
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
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <Modal
                title={t('RegistrationNotification')}
                visible={isLoginModalVisible}
                onCancel={() => setIsLoginModalVisible(false)}
                footer={[
                    <Button key="link" href="/">
                        {t('Cancel')}
                    </Button>,
                    <Button key="link" href="/login" type="primary">
                       {t('Login')}
                    </Button>,
                ]}
            >
               {t('PleaseLogin')}
            </Modal>
            <Modal
                title={t('RegistrationNotification')}
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={[
                    <Button key="back" onClick={() => setIsOpenModal(false)}>
                        {t('Cancel')}
                    </Button>,
                    <Button key="link" onClick={handleConfirmPayment} type="primary">
                        {t('Continue')}
                    </Button>,
                ]}
            >
                {t('CurrentlyYouAreInPackage')} {subscriptionTypeId === 2 ? packageTranslationMap[getCurrentLanguage()]['Tiêu chuẩn'] : packageTranslationMap[getCurrentLanguage()]['Cao cấp'] }.{' '}
                <span className="text-red-600">{t('IfYouContinue')}</span>, {t('YourCurrent')}
            </Modal>
            <div className="title-summary">{t('PaymentDetails')}</div>
            <div className="information">
                <div className="term-package">
                    <div className="name-package">
                        <div className="">{t('PackageName')}</div>
                        <div className="value">{packageTranslationMap[getCurrentLanguage()][namePackage]}</div>
                    </div>
                    <div className="term">
                        <div className="">{t('PackageDuration')}</div>
                        <div className="value">
                            {durationValue >= 10 ? '' : 0}
                            {durationValue || 1} {t('Month')}
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-neutral-300" />
                <div className="time">
                    <div className="time-start">
                        <div className="">{t('EffectiveDate')}</div>
                        <div className="value">{startDate}</div>
                    </div>
                    <div className="time-start">
                        <div className="">{t('ValidUntil')}</div>
                        <div className="value">{moment(endDate).format('DD/MM/YYYY')}</div>
                    </div>
                    <div className="time-end">
                        <div className="">{t('NextPaymentPeriod')}</div>
                        <div className="value">{handleRecoverDate()}</div>
                    </div>
                </div>

                <hr className="my-2 border-neutral-300" />
                <div className="price-package">
                    <div className="price">
                        <div className="">{t('Value')}</div>
                        <div className="value">
                            {selectedTerm?.price.toLocaleString('it-IT') || '---'}&nbsp;₫
                        </div>
                    </div>
                    <div className="price">
                        <div className="">{t('Discount')}</div>
                        <div className="value">
                            {discount !== 0 ? discount * 100 : '---'}&nbsp;%
                        </div>
                    </div>
                </div>
                <hr className="my-2 border-neutral-300" />
                <div className="method">
                    <div className="method-payment">
                        <div className="">{t('PaymentMethod')}</div>
                        <div className="value">{methodShowMap[selectedMethod]}</div>
                    </div>
                </div>
                <hr className="my-2 border-neutral-300" />
                <div className="total-price">
                    <div className="">{t('TotalAmount')}</div>
                    <div className="value-1">
                        {totalPrice.toLocaleString('it-IT') || '---'}
                        &nbsp;₫
                    </div>
                </div>
                <div className="note">
                    {t('ByConfirming')}{' '}
                    <a
                        href="#"
                        style={{
                            color: 'var(--primary-color)',
                            fontWeight: '500',
                        }}
                    >
                        {t('ContractAndPolicy')}{' '}
                    </a>
                    {t('Of')} MOVTIME.
                </div>
            </div>
            {subscriptionTypeId === 1 ? (
                <Button className={`btn-confirm flex ont-medium`} type="primary" onClick={handleConfirmPayment}>
                    {t('Confirm')}
                </Button>
            ) : (
                <Button
                    className={`btn-confirm flex font-medium`}
                    type="primary"
                    onClick={() => setIsOpenModal(true)}
                >
                    {t('Confirm')}
                </Button>
            )}
        </div>
    );
};

export default Summary;
