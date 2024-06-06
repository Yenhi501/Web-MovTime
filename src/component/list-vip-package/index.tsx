import { useEffect, useState } from 'react';
import { SubscriptionType } from '../../page/vip-package';
import { setIdSelectedInfoPackage, setNamePackage } from '../../redux/VIPPaymentSlice';
import { useAppDispatch } from '../../redux/hook';
import { t } from '../../utils/i18n';
import './index.scss';
import { getCurrentLanguage } from '../../utils/localization';
import { packageTranslationMap } from '../header/constant';

export interface DataTable {
    title: string;
    package1: string;
    package2: string;
    id: string;
}
export interface DataVIPLabel {
    title: string;
    value: string;
}

export type subInfo = {
    qualityVideo: string;
    resolution: string;
};

export type ListVipPackage = {
    className?: string;
    dataVIPPackage?: SubscriptionType[];
};
export const ListVipPackage = ({ className, dataVIPPackage = [] }: ListVipPackage) => {
    const [selectedPackage, setSelectedPackage] = useState(2);
    const dispatch = useAppDispatch();
    const [dataRender, setDataRender] = useState<
        {
            label: string;
            value1: string | number;
            value2: string | number;
        }[]
    >([]);

    useEffect(() => {
        if (dataVIPPackage.length !== 0) {
            setDataRender([
                {
                    label: t('MonthlyPrice'),
                    value1: `${dataVIPPackage[0].price.toLocaleString('it-IT')} ₫`,
                    value2: `${dataVIPPackage[1].price.toLocaleString('it-IT')} ₫`,
                },
                {
                    label: t('VideoQuality'),
                    value1: t('Good'),
                    value2: t('Best'),
                },
                {
                    label: t('Resolution'),
                    value1: '1080p',
                    value2: '4k+HDR',
                },
            ]);
            setSelectedPackage(dataVIPPackage[0].subscriptionTypeId);
            dispatch(setIdSelectedInfoPackage(dataVIPPackage[0].subscriptionTypeId));
            dispatch(setNamePackage(dataVIPPackage[0].name));
        }
    }, [dataVIPPackage]);

    return (
        <table className={`list-vip-package-table ${className}`}>
            <tr className="list-vip-package-radio">
                <td></td>
                {dataVIPPackage.map((value) => (
                    <td className="list-vip-package-radio-cell">
                        <label
                            htmlFor={value.subscriptionTypeId.toString()}
                            className={`list-vip-package-label ${
                                selectedPackage === value.subscriptionTypeId ? 'selected' : ''
                            }`}
                            onClick={() => {
                                setSelectedPackage(value.subscriptionTypeId);
                                dispatch(setIdSelectedInfoPackage(value.subscriptionTypeId));
                                dispatch(setNamePackage(value.name));
                            }}
                        >
                            {packageTranslationMap[getCurrentLanguage()]?.[value.name]}
                        </label>
                        <input
                            type="radio"
                            name="vip"
                            id={value.subscriptionTypeId.toString()}
                            value={value.subscriptionTypeId}
                            hidden
                        />
                    </td>
                ))}
            </tr>
            {dataRender.map((value) => (
                <tr className="list-vip-package-row">
                    <td className="list-vip-package-cell list-vip-package-title ">{value.label}</td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 2 ? 'highlight' : ''
                        }`}
                    >
                        {value.value1}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 3 ? 'highlight' : ''
                        }`}
                    >
                        {value.value2}
                    </td>
                </tr>
            ))}
        </table>
    );
};
