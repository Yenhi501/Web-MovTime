import { ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Divider, Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FilmItem } from '../film-item';
import { TabContent } from './actor-tag-content';
import { endpoint } from '../../utils/baseUrl';
import { TabItem } from './actor-tag-item';
import './index.scss';
import { ActorInfo, TabsProps } from './type';
import { Helmet } from 'react-helmet-async';

const Actor: React.FC<TabsProps> = ({ color }) => {
    const [openTab, setOpenTab] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const { actorId } = useParams();
    const [actorInfo, setActorInfo] = useState<ActorInfo | null>(null);
    const [films, setFilms] = useState<Array<FilmItem>>([]);
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [qrCode, setQrCodeUrl] = useState<string | null>(null);

    const defaultImage =
        'https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg';
    const ogTags = {
        title: actorInfo?.name || 'Actor Name',
        description: actorInfo?.name || 'Actor Description',
        image: defaultImage,
        url: `${window.location.origin}/actor/${actorId}`,
        type: 'article',
    };

    const fetchActorQRCode = async () => {
        const actorLink = encodeURIComponent(`${window.location.origin}/actor/${actorId}`);
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
        fetch(`${endpoint}/api/individuals/actors/${actorId}`)
            .then((response) => response.json())
            .then((data) => {
                setActorInfo(data.data);
                setFilms(data.data.movies);
                fetchActorQRCode();

                ogTags.title = data.data.name || 'Actor Name';
                ogTags.description = data.data.description || 'Actor Description';
                ogTags.image = data.data.avatar || defaultImage;
                ogTags.url = `https://www.movetimes.tech/actor/${actorId}`;
                ogTags.type = 'actor';
            })
            .catch((error) => console.error('Error:', error));
    }, [actorId]);

    const handleTabClick = (tabNumber: number) => {
        setOpenTab(tabNumber);
        setActiveTab(tabNumber);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        const actorLink = `${window.location.origin}/actor/${actorId}`;
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
        { id: 1, label: 'Bộ tác phẩm' },
        { id: 2, label: 'Nội dung đặc sắc' },
        { id: 3, label: 'Nhân vật liên quan' },
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
            <Helmet>
                <meta property="og:title" content={ogTags.title || 'Actor Name'} />
                <meta
                    property="og:description"
                    content={ogTags.description || 'Actor Description'}
                />
                <meta property="og:image" content={ogTags.image || defaultImage} />
                <meta
                    property="og:url"
                    content={ogTags.url || `${window.location.origin}/actor/${actorId}`}
                />
                <meta property="og:type" content={ogTags.type || 'article'} />
            </Helmet>
            {actorInfo && (
                <div>
                    <div className="container-actor__header"></div>
                    <div className="flex rounded-lg p-10 ml-14">
                        <div className="">
                            <Avatar
                                className=" bg-white rounded-full w-full h-auto border-[5px] border-white shadow mb-4 object-cover"
                                src={actorInfo.avatar}
                                size={160}
                            />
                        </div>
                        <div className="my-3 ml-12">
                            <p className="font-semibold" style={{ fontSize: '2.4rem' }}>
                                {actorInfo.name}
                            </p>
                            <div className="text-base text-[#989898] flex mt-4">
                                {actorInfo.description}
                            </div>

                            <div className="flex mt-6 text-base">
                                <div>
                                    <span className="text-[#989898] mr-4">{actorInfo.gender}</span>
                                    {'|'}
                                </div>
                                <div className="mx-4">
                                    <span className="text-[#989898] mr-4">Diễn viên</span>
                                    {'|'}
                                </div>
                                <div>
                                    <span className="text-[#989898] mr-4">Trung Quốc</span>
                                    {'|'}
                                </div>
                                <div className="mx-4">
                                    <span className="text-[#989898] ">
                                        {formatDate(actorInfo.dateOfBirth)}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <button className="btn-share" onClick={showModal}>
                                    <ShareAltOutlined />
                                    <p>Chia sẻ</p>
                                </button>
                                <Modal
                                    title="Chia sẻ"
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
                                            Liên kết
                                        </a>
                                    </div>
                                    <Divider className="!bg-gray-600" />
                                    <div className="flex flex-col justify-center items-center mt-4">
                                        <p>Quét để chia sẻ trên thiết bị di động</p>

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
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <ul
                                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-[40%] ml-[90px]"
                                role="tablist"
                            >
                                {tabsData.map((tab) => (
                                    <TabItem
                                        key={tab.id}
                                        isActive={openTab === tab.id}
                                        onClick={() => handleTabClick(tab.id)}
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
export default Actor;
