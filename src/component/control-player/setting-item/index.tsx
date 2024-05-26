import { ControlOutlined, DashboardOutlined } from '@ant-design/icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './index.scss';

export type SettingItemData = {
    icon?: React.ReactNode;
    name?: string;
    value?: string;
};

const speedMap: Record<number, string> = {
    0.25: '0.25x',
    0.5: ' 0.5x',
    0.75: ' 0.75x',
    1: 'Chuẩn',
    1.25: '1.25x',
    1.5: '1.5x',
    1.75: '1.75x',
    2.0: '2.0x',
};

const qualityMap: Record<number, string> = {
    360: '360p',
    480: '480p',
    720: '720p',
    1080: '1080p',
    4: '4K+HDR',
};

export type SettingItem = {
    items?: SettingItemData[];
    onSelected?: (value?: string) => void;
    className?: string;
    currValue?: number[];
};
export const SettingItem = ({
    items,
    onSelected = () => {},
    className,
    currValue = [],
}: SettingItem) => {
    return (
        <div className={`setting-item-container ${className}`}>
            {items?.map((value, index) => (
                <div
                    className=" flex items-center justify-between px-3 py-4 hover:bg-zinc-700/[.5] cursor-pointer"
                    onClick={() => onSelected(value.value)}
                    key={index}
                >
                    <div className="setting-item flex gap-2 items-center text-slate-50">
                        {value.icon}
                        <h4 className="title inline-block font-medium ">{value.name}</h4>
                    </div>
                    <div className="flex gap-2 items-center text-slate-50">
                        <span className="content inline-block text-sm">
                            {value.value === 'speed'
                                ? speedMap[currValue[index]]
                                : qualityMap[currValue[index]]}
                        </span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </div>
            ))}
        </div>
    );
};
