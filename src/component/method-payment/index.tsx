import { Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { VNPayLogo } from '../../asset/icon/VNPay-logo';
import { Paypal } from '../../asset/icon/paypal';
import { setMethodPayment } from '../../redux/VIPPaymentSlice';
import { useAppDispatch } from '../../redux/hook';
import './index.scss';
import { t } from '../../utils/i18n';

interface PaymentMethod {
    icon: React.ReactNode;
    label: string;
    value: number;
}

interface MethodPaymentProps {
    setSelectedMethod: (props?: any) => void;
}

const methods: PaymentMethod[] = [
    {
        icon: <Paypal />,
        label: 'Paypal',
        value: 1,
    },
    {
        icon: <VNPayLogo />,
        label: 'VNPay',
        value: 2,
    },
];

export const MethodPayment: React.FC<MethodPaymentProps> = ({ setSelectedMethod }) => {
    const [value, setValue] = useState(1);

    const dispatch = useAppDispatch();

    const onChange = (e: any) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        setSelectedMethod(selectedValue);
        dispatch(setMethodPayment(selectedValue));
    };

    useEffect(() => {
        dispatch(setMethodPayment(1));
        setSelectedMethod(1);
    }, [dispatch, setSelectedMethod]);

    return (
        <div className="wrapper-method">
            <div className="title-method">{t('SelectPaymentMethod')}</div>
            <div className="container-method">
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {methods.map((method, index) => (
                            <Radio key={index} value={method.value}>
                                <Space>
                                    <div className="items">
                                        <div className="icon-method">{method.icon}</div>
                                        <div className="label-method">{method.label}</div>
                                    </div>
                                </Space>
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </div>
        </div>
    );
};
