import React from 'react';
import { Modal, Divider, Spin } from 'antd';
import { FacebookShareButton } from 'react-share';

interface ShareModalProps {
    movieId?: string | undefined;
    visible: boolean;
    closeModal: () => void;
    copiedLink: string | null;
    handleCopyLink: () => void;
    handleAddToLove: () => void;
    addedToLove: boolean;
    handleShare: () => void;
    qrCode: string | null;
}

const ShareModal: React.FC<ShareModalProps> = ({
    movieId,
    visible,
    closeModal,
    copiedLink,
    handleCopyLink,
    qrCode,
}) => {
    return (
        <Modal
            title={<p className="flex items-center justify-center mb-2">Chia sẻ</p>}
            visible={visible}
            footer={null}
            onCancel={closeModal}
            width={450}
        >
            <div className="flex gap-10 items-center justify-center">
                <FacebookShareButton url={`http://movetimes.tech/movie/${movieId}`}>
                    <a className="modal-item flex flex-col items-center">
                        <img
                            className="modal-img ml-4"
                            src="https://www.iqiyipic.com/lequ/20220216/Facebook@3x.png"
                            alt="facebook"
                        />
                        <p className="text-sm mt-2"> Facebook</p>
                    </a>
                </FacebookShareButton>

                <a className="modal-item  flex flex-col" onClick={handleCopyLink}>
                    <img
                        className="modal-img ml-4"
                        src="https://www.iqiyipic.com/lequ/20220216/copylink@2x.png"
                        alt="addresss"
                    />
                    <p className="text-sm mt-2">Sao chép link</p>
                </a>
            </div>
            <Divider className="!bg-gray-600" />
            <div className="flex flex-col justify-center items-center mt-4">
                <p>Quét để chia sẻ trên thiết bị di động</p>
                {qrCode ? (
                    <img
                        src={qrCode}
                        alt="QR Code"
                        style={{ width: '100px', height: '100px', marginTop: '15px' }}
                    />
                ) : (
                    <Spin></Spin>
                )}
            </div>
        </Modal>
    );
};

export default ShareModal;
