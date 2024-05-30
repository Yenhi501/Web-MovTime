import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { t } from '../../../utils/i18n';

export const ContentModalVipTitle = () => {
    return (
        <Link
            to={'/VIPpackage'}
            className="flex justify-between mb-7 font-normal text-[13px] text-[#a9a9ac] cursor-pointer hover:text-[var(--primary-color)]"
        >
            <p>{t('MemberBenefits')}</p>
            <RightOutlined />
        </Link>
    );
};
