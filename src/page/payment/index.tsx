import React, { useEffect, useState } from 'react';
import './index.scss';
import { HeaderPay } from '../../component/header-pay';
import { MethodPayment } from '../../component/method-payment';
import { TermPackage } from '../../component/term-package';
import { Summary } from '../../component/sumary';
import axios from 'axios';
import { SubscriptionInfo } from '../../model/subscription-info';
import { useParams } from 'react-router-dom';
import { endpoint } from '../../utils/baseUrl';

export const Payment = () => {
    const [selectedTerm, setSelectedTerm] = useState<TermPackage | null>({
        id: 0,
        value: 0,
        price: 0,
    });
    const [selectedMethod, setSelectedMethod] = useState(1);
    const [dataSubscriptionInfo, setDataSubscriptionInfo] = useState<SubscriptionInfo[]>([]);
    const { idPackage } = useParams();

    const [selectedPackageId, setSelectedPackageId] = useState(0);
    const [discount, setDiscount] = useState(1);

    const getDataSubscriptionInfo = () => {
       
    };

    useEffect(() => {
        getDataSubscriptionInfo();
    }, []);

    useEffect(() => {
        if (dataSubscriptionInfo.length !== 0) {
            dataSubscriptionInfo.forEach((subscription) => {
                if (
                    subscription.subscriptionType.subscriptionTypeId === Number(idPackage) &&
                    subscription.duration.durationId === selectedTerm?.id
                ) {
                    setSelectedPackageId(subscription.subscription_info_id);
                    setDiscount(subscription.discount);
                }
            });
        }
    }, [selectedTerm, idPackage]);

    return (
        <>
            <HeaderPay currentStep={1} />
            <div className="container-payment">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedMethod={setSelectedMethod} />
                </div>
                <div className="summary">
                    <Summary
                        subscriptionInfoId={selectedPackageId}
                        selectedMethod={selectedMethod}
                        selectedTerm={selectedTerm}
                        discount={discount}
                    />
                </div>
            </div>
        </>
    );
};
