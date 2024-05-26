// BillItem.tsx
import React from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import './index.scss';

interface BillItemProps {
    title: React.ReactNode;
    content: React.ReactNode;
}

export const BillItem: React.FC<BillItemProps> = ({ title, content }) => {
    return (
        <li className="bill-item ">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 mr-[-16px]">
                    <CheckCircleTwoTone
                        className="w-8 h-8 rounded-full"
                        twoToneColor="#52c41a"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="bill-title">{title}</p>
                </div>
                <div style={{ marginLeft: '140px' }} className="bill-value">
                    {content}
                </div>
            </div>
        </li>
    );
};
