import { Alert, Col, Row } from 'antd';
import Marquee from 'react-fast-marquee';

export const ContentModalVip = () => {
    return (
        <div>
            <div className="mb-6 ">
                <Row gutter={34}>
                    <Col span={12} className="flex ">
                        <img
                            src="https://pic3.iqiyipic.com/common/lego/20201026/37b926ea899b478b8bf9e23259c92c2a.png"
                            alt=""
                            className="w-8 h-8"
                        />
                        <p className="ml-2 text-[13px]"> Nội dung độc quyền</p>
                    </Col>
                    <Col span={12} className="flex">
                        <img
                            src="https://pic3.iqiyipic.com/common/lego/20201026/40feaa83a74e45ada3240b716f628d77.png"
                            alt=""
                            className="w-8 h-8"
                        />
                        <p className="ml-2 text-[13px]"> Không quảng cáo</p>
                    </Col>
                </Row>
                <Row gutter={34} className="mt-8">
                    <Col span={12} className="flex ">
                        <img
                            src="https://pic3.iqiyipic.com/common/lego/20201026/37b926ea899b478b8bf9e23259c92c2a.png"
                            alt=""
                            className="w-8 h-8"
                        />
                        <p className="ml-2 text-[13px]"> Nội dung độc quyền</p>
                    </Col>
                    <Col span={12} className="flex">
                        <img
                            src="https://pic3.iqiyipic.com/common/lego/20201026/40feaa83a74e45ada3240b716f628d77.png"
                            alt=""
                            className="w-8 h-8"
                        />
                        <p className="ml-2 text-[13px]"> Không quảng cáo</p>
                    </Col>
                </Row>
            </div>
            <Alert
                style={{ backgroundColor: '#f2bf83', borderColor: '#f2bf83' }}
                className="text-[13px]"
                message={
                    <Marquee gradient={false}> Đăng ký VIP. Tận hưởng nội dung độc quyền </Marquee>
                }
            />
        </div>
    );
};
