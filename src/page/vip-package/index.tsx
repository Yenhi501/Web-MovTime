import { CheckOutlined } from '@ant-design/icons';
import { List } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderPay } from '../../component/header-pay';
import { ListVipPackage } from '../../component/list-vip-package';
import { VIPPackageRaw } from '../../model/VIP-package';
import { DurationVIP } from '../../model/duration-VIP';
import { useAppSelector } from '../../redux/hook';
import { endpoint } from '../../utils/baseUrl';
import './index.scss';

const data = [
    {
        title: 'Xem mọi nội dung bạn muốn. Không có quảng cáo.',
    },
    {
        title: 'Đề xuất dành riêng cho bạn.',
    },
    {
        title: 'Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.',
    },
];

export type SubscriptionType = {
    subscriptionTypeId: number;
    name: string;
    price: number;
    createdAt?: '2023-12-10T05:14:41.448Z';
    updatedAt?: '2023-12-10T05:14:41.448Z';
    deletedAt?: null;
};

export type dataVIPPackageRaw = {
    subscriptionInfoId: number;
    discount: number;
    price: number;
    subscriptionType: SubscriptionType;
    duration: DurationVIP;
};

export const VIPPackage = () => {
    const [dataVIPPackage, setDataVIPPackage] = useState<VIPPackageRaw[]>();
    const idPackage = useAppSelector((state) => state.VIPPayment.subscriptionTypeId);

    const getVipPackage = () => {
        axios
            .get(`${endpoint}/api/subscription/get-all-subscription-type`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                response.data.data.shift();
                setDataVIPPackage(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getVipPackage();
    }, []);

    return (
        <div className="wrapper-vip-package">
            <HeaderPay />
            <div className="vip-package-body">
                <Title level={2} className="vip-package-title">
                    Chọn gói dịch vụ phù hợp với bạn
                </Title>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<CheckOutlined className="vip-package-list-icon" />}
                                title={item.title}
                                className="vip-package-list-item"
                            />
                        </List.Item>
                    )}
                />
                <ListVipPackage className="list-vip-package" dataVIPPackage={dataVIPPackage} />
                <Paragraph className="list-vip-package-policy">
                    Việc bạn có thể xem ở chế độ HD (720p), Full HD (1080p), Ultra HD (4K) và HDR
                    hay không phụ thuộc vào dịch vụ internet và khả năng của thiết bị. Không phải
                    tất cả nội dung đều có sẵn ở mọi độ phân giải. Xem{' '}
                    <a href="#">Điều khoản sử dụng</a> của chúng tôi để biết thêm chi tiết.
                </Paragraph>
                <Link
                    to={`/payment/${idPackage}`}
                    state={{ idPackage: idPackage }}
                    className="list-vip-package-btn"
                >
                    Tiếp theo
                </Link>
            </div>
        </div>
    );
};
