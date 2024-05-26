import { Modal } from 'antd';
import { ReactNode } from 'react';

export type ModalUser = {
    open?: boolean;
    onCancel?: (event: any) => void;
    children?: ReactNode;
};
export const ModalUser = ({ open, onCancel, children }: ModalUser) => {
    return (
        <Modal
            title={<p className="!mb-6 !text-14">Sửa thông tin cá nhân</p>}
            open={open}
            onCancel={onCancel}
            footer={[]}
            className="edit-modal"
        >
            {children}
        </Modal>
    );
};
