import { Steps } from 'antd';
import { Link } from 'react-router-dom';
import { LogoDark } from '../../asset/icon/logoDark';
import './index.scss';
import { t } from '../../utils/i18n';

export type HeaderPay = { currentStep?: number };

export const HeaderPay = ({ currentStep = 0 }: HeaderPay) => {
    return (
        <header className="wrapper-header-pay">
            <div className="flex justify-between items-center">
                <div className="logo">
                    <Link to="/">
                        <LogoDark />
                    </Link>
                </div>
            </div>
            <div
                style={{
                    width: '60%',
                    marginRight: 'var(--spacing-lg)',
                }}
                className="flex justify-between w-full items-center"
            >
                <Steps
                    current={currentStep}
                    items={[
                        {
                            title: t('SelectPackage'),
                        },
                        {
                            title: t('ChooseTermAndPaymentMethod'),
                        },
                        {
                            title: t('Result'),
                        },
                    ]}
                />
            </div>
        </header>
    );
};
