import React, { useEffect, useState } from 'react';
import './index.scss';
import { Radio, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { DurationVIP } from '../../model/duration-VIP';
import axios from 'axios';
import { dataVIPPackageRaw } from '../../page/vip-package';
import {
    setDurationValue,
    setIdSelectedInfoDuration,
    setTotalPrice,
} from '../../redux/VIPPaymentSlice';
import { useParams } from 'react-router-dom';
import { endpoint } from '../../utils/baseUrl';

export interface TermPackage {
    id: number;
    value: number;
    price: number;
}
interface TermPackageProps {
    setSelectedTerm: (term: TermPackage) => void;
}

export const TermPackage: React.FC<TermPackageProps> = ({ setSelectedTerm }) => {
    const idPackage: number = Number(useParams().idPackage);

    const [terms, setTerms] = useState<DurationVIP[]>([]);
    const getDataDuration = () => {
        axios
            .get(`${endpoint}/api/subscription/get-all-subscription-info`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                const listData: dataVIPPackageRaw[] = response.data.data;

                const dataTemp: DurationVIP[] = listData.map((value) => {
                    return value.subscriptionType.subscriptionTypeId === idPackage
                        ? {
                              durationId: value.duration.durationId,
                              time: value.duration.time,
                              price: value.price,
                          }
                        : { durationId: 0, time: 0, price: 0 };
                });

                setTerms(dataTemp);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getDataDuration();
    }, []);

    const [value, setValue] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let count = 0;
        if (terms.length !== 0) {
            terms.forEach((term) => {
                if (term.durationId !== 0 && count === 0) {
                    setValue(term.durationId);
                    dispatch(setIdSelectedInfoDuration(term.durationId));
                    count++;
                    dispatch(setTotalPrice(term.price));
                    setSelectedTerm({ id: term.durationId, value: term.time, price: term.price });
                }
            });
        }
    }, [terms]);

    const onChange = (e: any) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
    };

    return (
        <div className="wrapper-term">
            <div className="title-term">Chọn thời hạn gói</div>
            <div className="container-term">
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {terms.map((term, index) =>
                            term.durationId !== 0 ? (
                                <Radio
                                    key={index}
                                    value={term.durationId}
                                    onClick={() => {
                                        setValue(term.durationId);
                                        const temp: TermPackage = {
                                            id: term.durationId,
                                            value: term.time,
                                            price: term.price,
                                        };

                                        setSelectedTerm(temp);
                                    }}
                                >
                                    <Space>
                                        <div className="items">
                                            <div className="value-term">
                                                {term.time >= 10 ? '' : 0}
                                                {term.time}&nbsp;tháng
                                            </div>
                                            <div className="price-term">
                                                {term.price.toLocaleString('it-IT')}&nbsp;₫
                                            </div>
                                        </div>
                                    </Space>
                                </Radio>
                            ) : null,
                        )}
                    </Space>
                </Radio.Group>
            </div>
        </div>
    );
};
