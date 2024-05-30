/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Logo } from '../../asset/icon/logo';
import './index.scss';

interface RegulationItem {
    text: string;
    link: string;
}

interface HelpItem {
    text: string;
    link: string;
}

export const Footer: React.FC = () => {
    const regulations: RegulationItem[] = [
        {
            text: 'Điều khoản sử dụng',
            link: '',
        },
        {
            text: 'Chính Sách và Quy Định Chung',
            link: '',
        },
        {
            text: 'Chính Sách Về Quyền Riêng Tư',
            link: '',
        },
        {
            text: 'Chính Sách Về Sở Hữu Trí Tuệ',
            link: '',
        },
    ];

    const helpItems: HelpItem[] = [
        {
            text: 'Trung Tâm Hỗ Trợ',
            link: '',
        },
        { text: 'FAQs', link: '' },
        { text: 'Liên Hệ', link: '' },
        {
            text: 'Góp ý',
            link: '',
        },
    ];

    return (
        <div
            className="footer"
            style={{
                marginLeft: 'var(--spacing-lg)',
            }}
        >
            <footer>
                <div className="py-6">
                    <hr
                        className="my-6 border-neutral-800"
                        style={{ marginLeft: '-40px' }}
                    />
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <a className="flex">
                                <Logo />
                            </a>
                        </div>
                        <div
                            className="grid grid-cols-2"
                            style={{
                                marginRight: '10px',
                            }}
                        >
                            <div>
                                <h2 className="mb-6 font-semibold uppercase">
                                    Quy Định
                                </h2>
                                <ul className="text-gray-500">
                                    {regulations.map((item, index) => (
                                        <li className="my-3" key={index}>
                                            <a href={item.link}>{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="ml-[40px]">
                                <h2 className="mb-6 font-semibold uppercase">
                                    Trợ Giúp
                                </h2>
                                <ul className="text-gray-500">
                                    {helpItems.map((item, index) => (
                                        <li className="my-3" key={index}>
                                            <a href={item.link}>{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr
                        className="my-6 border-neutral-800"
                        style={{ marginLeft: '-40px' }}
                    />
                    <div className="flex items-center justify-between">
                        <div className="text-gray-300 mt-6">
                            Công ty Cổ phần Movies - Địa chỉ: Tầng 5, 222
                            Pasteur, Phường Võ Thị Sáu, Quận 3, Đà Nẵng.
                            <br />
                            <span>Email: </span>
                            <a
                                className="link"
                                href="mailto:support@vieon.vn"
                                title="Email hỗ trợ: support@vieon.vn"
                                target="_parent"
                            >
                                support@vieon.vn
                            </a>
                            <span> | Hotline: </span>
                            <a
                                className="link"
                                href="tel:(+84)1800599920"
                                title="Hãy gọi cho chúng tôi theo số hotline 1800.599.920 (miễn phí)"
                                target="_parent"
                            >
                                1800.599.920
                            </a>
                            <span> miễn phí </span>
                            <br />
                            Giấy phép Cung cấp Dịch vụ Phát thanh, Truyền hình
                            trả tiền số 247/GP-BTTTT cấp ngày 21/07/2023.
                        </div>
                        <div className="flex mt-8 mb-4 space-x-5 mr-10">
                            <img
                                className="w-[80px] h-[80px]"
                                src="https://media.alzheimer-nederland.nl/s3fs-public/styles/w780/public/media/2022-12/images/AN_QR-code_07-2022.jpg.webp?VersionId=NWHJWB0BZl_DTZXaMjIG5Blpvo.iy6rn&itok=v3Y46mT2"
                                alt="QRCode"
                            />

                            <div
                                className="flex flex-col justify-center items-center "
                                style={{
                                    marginRight: 'var(--spacing-lg)',
                                }}
                            >
                                <div className="text-gray-300">
                                    Quét mã QR để tải ứng dụng
                                </div>
                                <div className="flex mt-4 space-x-2 ">
                                    <a
                                        href=""
                                        className="border-2 border-gray-700"
                                    >
                                        <img
                                            className="image-block mx-auto w-[120px]"
                                            src="https://static2.vieon.vn/production-vieon-web-v5-2/assets/img/sprites/Download-Appstore.svg"
                                            alt="Tải ứng dụng VieON cho App Store"
                                            title="Tải ứng dụng VieON cho App Store"
                                        />
                                    </a>
                                    <a
                                        href=""
                                        className="border-2 border-gray-700"
                                    >
                                        <img
                                            className="image-block mx-auto w-[120px]"
                                            src="https://static2.vieon.vn/production-vieon-web-v5-2/assets/img/sprites/download-googleplay.svg"
                                            alt="Tải ứng dụng VieON cho Android"
                                            title="Tải ứng dụng VieON cho Android"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
