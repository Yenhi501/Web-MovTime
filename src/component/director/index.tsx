import { ShareAltOutlined } from '@ant-design/icons';
import { Divider, Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { TabItem } from './director-tag-item';
import './index.scss';
import { TabContent } from './director-tag-content/index';
import { FilmItem } from '../film-item';
import { useParams } from 'react-router';
import { endpoint } from '../../utils/baseUrl';
import { TabsProps } from '../actor/type';
import { DirectorInfo } from './type';
import { t } from '../../utils/i18n';

export const Director: React.FC<TabsProps> = ({ color }) => {
    const [openTab, setOpenTab] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const { directorId } = useParams();
    const [directorInfo, setDirectorInfo] = useState<DirectorInfo | null>(null);
    const [films, setFilms] = useState<Array<FilmItem>>([]);
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [qrCode, setQrCodeUrl] = useState<string | null>(null);
    const fetchActorQRCode = async () => {
        const actorLink = encodeURIComponent(`${window.location.origin}/director/${directorId}`);
        try {
            const response = await fetch(`${endpoint}/api/movies/get/qrcode?url=${actorLink}`);

            if (response.ok) {
                const data = await response.json();
                setQrCodeUrl(data.qrCode);

                if (typeof data.qrCode === 'string') {
                    const regex = /(data:image\/png;base64,[^'"]+)/;
                    const match = data.qrCode.match(regex);

                    if (match) {
                        const base64Value = match[1];
                        setQrCodeUrl(base64Value || '');
                    }
                }
            } else {
                console.error('Failed to fetch QR code URL');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch(`${endpoint}/api/individuals/directors/${directorId}`)
            .then((response) => response.json())
            .then((data) => {
                setDirectorInfo(data.data);
                setFilms(data.data.movies);
                fetchActorQRCode();
            })
            .catch((error) => console.error('Error:', error));
    }, [directorId]);

    const handleTabClick = (tabNumber: number) => {
        setOpenTab(tabNumber);
        setActiveTab(tabNumber);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        const actorLink = `${window.location.origin}/director/${directorId}`;
        setCopiedLink(actorLink);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCopyLink = () => {
        if (copiedLink) {
            navigator.clipboard.writeText(copiedLink);
            message.success('Sao chép thành công');
        }
    };

    const tabContents = [
        { id: 'botacpham', isActive: openTab === 1 },
        { id: 'noidungdacsac', isActive: openTab === 2 },
        { id: 'nhanvatlienquan', isActive: openTab === 3 },
    ];

    const tabsData = [
        { id: 1, label: 'Bộ tác phẩm', href: '#botacpham' },
        { id: 2, label: 'Nội dung đặc sắc', href: '#noidungdacsac' },
        { id: 3, label: 'Nhân vật liên quan', href: '#nhanvatlienquan' },
    ];

    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <>
            {directorInfo && (
                <div>
                    <div className="container-director__header"></div>
                    <div className="flex rounded-lg p-10 ml-14">
                        <div className="">
                            <img
                                className="h-52 w-52 bg-white p-2 rounded-full shadow mb-4 object-cover"
                                src={directorInfo.avatar}
                                alt=""
                            />
                        </div>
                        <div className="my-3 ml-12">
                            <p className="font-semibold" style={{ fontSize: '2.4rem' }}>
                                {directorInfo.name}
                            </p>
                            <div className="text-base  text-[#989898] flex mt-4">
                                {directorInfo.description}
                            </div>

                            <div className="flex mt-6 text-base">
                                <div>
                                    <span className="text-[#989898] mr-4">
                                        {directorInfo.gender}
                                    </span>
                                    {'|'}
                                </div>
                                <div className="mx-4">
                                    <span className="text-[#989898] mr-4">{t('Director')}</span>
                                    {'|'}
                                </div>
                                <div>
                                    <span className="text-[#989898] mr-4">Trung Quốc</span>
                                    {'|'}
                                </div>
                                <div className="mx-4">
                                    <span className="text-[#989898] ">
                                        {formatDate(directorInfo.dateOfBirth)}
                                    </span>
                                </div>
                            </div>

                            <button className="btn-share" onClick={showModal}>
                                <ShareAltOutlined />
                                <p>{t('Share')}</p>
                            </button>
                            <Modal
                                title={
                                    <div className="flex items-center justify-center !text-[20px]">
                                        {t('Share')}
                                    </div>
                                }
                                visible={isModalVisible}
                                footer={null}
                                onCancel={handleCancel}
                                width={450}
                                className="top-32"
                            >
                                <div className="flex gap-10 items-center justify-center">
                                    <a
                                        className="modal-item"
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                            copiedLink || '',
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="modal-img"
                                            src="https://www.iqiyipic.com/lequ/20220216/Facebook@3x.png"
                                            alt="facebook"
                                        />
                                        Facebook
                                    </a>

                                    <a className="modal-item" onClick={handleCopyLink}>
                                        <img
                                            className="modal-img"
                                            src="https://www.iqiyipic.com/common/fix/global/copylink.png"
                                            alt="addresss"
                                        />
                                         {t('Link')}
                                    </a>
                                </div>
                                <Divider className="!bg-gray-600" />
                                <div className="flex flex-col justify-center items-center mt-4">
                                    <p>{t('ScanToShareOnMobileDevice')}</p>

                                    {qrCode ? (
                                        <div className="flex items-center justify-center mt-4">
                                            <img
                                                src={qrCode}
                                                alt="QR Code"
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <Spin></Spin>
                                    )}
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <ul
                                style={{
                                    width: '40%',
                                    marginLeft: '90px',
                                }}
                                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                role="tablist"
                            >
                                {tabsData.map((tab) => (
                                    <TabItem
                                        key={tab.id}
                                        isActive={openTab === tab.id}
                                        onClick={() => handleTabClick(tab.id)}
                                        href={tab.href}
                                        label={tab.label}
                                    />
                                ))}
                            </ul>

                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded ">
                                <div className="px-4 py-5 flex-auto ">
                                    {tabContents.map((tabcontent) => (
                                        <div
                                            className="tab-content tab-space ml-[-30px]"
                                            key={tabcontent.id}
                                        >
                                            <TabContent
                                                isActive={tabcontent.isActive}
                                                id={tabcontent.id}
                                                filmMap={films}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
