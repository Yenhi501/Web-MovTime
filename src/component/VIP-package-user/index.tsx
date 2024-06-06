import { Empty, Table, Tag } from 'antd';
import moment from 'moment';
import { CurrentUser } from '../../model/user';
import './index.scss';
import { t } from '../../utils/i18n';

interface VIPPackageUser {
    data: CurrentUser;
}

const columns = [
    {
        title: 'Username',
        dataIndex: 'id',
        key: 'id',
        // render: (text, id) => <Link to={`/billpayment-${id.key}`}>{text}</Link>,
    },
    {
        title: t('PackageName'),
        dataIndex: 'namePackage',
        key: 'namePackage',
    },
    {
        title: t('Status'),
        key: 'status',
        dataIndex: 'status',
        render: (_: any, { status }: any) => {
            let color;
            if (status === 'Đã mua') {
                color = 'green';
            } else {
                color = 'volcano';
            }
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: t('StartDay'),
        dataIndex: 'startDay',
        key: 'startDay',
    },
    {
        title: t('EndDay'),
        dataIndex: 'endDay',
        key: 'endDay',
    },
];

export const VIPPackageUser = ({ data }: VIPPackageUser) => {
    const dt = [
        {
            id: data.username,
            namePackage: data.subscription.subscriptionType,
            status: 'Đã mua',
            startDay: moment(data.subscription.updatedAt).format('DD/MM/YYYY'),
            endDay: moment(data.subscription.closeAt).format('DD/MM/YYYY'),
        },
    ];
    return (
        <div className="content-VIP-package">
            {dt ? <Table columns={columns} dataSource={dt} /> : <Empty />}
        </div>
    );
};
