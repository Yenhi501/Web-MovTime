import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const ContentModalVipTitle = () => {
    return (
        <Link
            to={'/VIPpackage'}
            className="flex justify-between mb-7 font-normal text-[13px] text-[#a9a9ac] cursor-pointer hover:text-[var(--primary-color)]"
        >
            <p>Quyền lợi thành viên </p>
            <RightOutlined />
        </Link>
    );
};
