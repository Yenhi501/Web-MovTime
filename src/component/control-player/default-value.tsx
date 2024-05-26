import { ControlOutlined, DashboardOutlined } from '@ant-design/icons';
import { SettingItemData } from './setting-item';
import { SettingContentData } from './setting-content';
import { TooltipProps } from 'antd';

export const defaultSettingItems: SettingItemData[] = [
    {
        icon: <DashboardOutlined className="text-xl " />,
        name: 'Tốc độ',
        value: 'speed',
    },
    {
        icon: <ControlOutlined className="text-xl " />,
        name: 'Chất lượng',
        value: 'quality',
    },
];

export const settingItemContentMap: Record<string, SettingContentData> = {
    speed: {
        title: 'Tốc độ',
        options: [
            { label: '0.25x', value: 0.25 },
            { label: '0.5x', value: 0.5 },
            { label: '0.75x', value: 0.75 },
            { label: 'Chuẩn', value: 1 },
            { label: '1.25x', value: 1.25 },
            { label: '1.5x', value: 1.5 },
            { label: '1.75x', value: 1.75 },
            { label: '2.0x', value: 2.0 },
        ],
    },
    quality: {
        title: 'Chất lượng',
        options: [
            { label: '4k+HDR', value: 4 },
            { label: '1080p', value: 1080 },
            { label: '720p', value: 720 },
        ],
    },
};

export const defaultCustomConfigSlider = {
    handleSize: 9,
    handleSizeHover: 9,
    handleColor: '#cf1a1a',
    handleActiveColor: '#cf1a1a',
    dotActiveBorderColor: '#cf1a1a',
    dotBorderColor: '#cf1a1a',
    handleLineWidthHover: 2,
    trackBg: '#cf1a1a',
    trackHoverBg: '#cf1a1a',
};

export const defaultPropsToolTip: TooltipProps = {
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0,
    overlayInnerStyle: { marginBottom: '25px' },
    arrow: false,
};

export const defaultOverlayInnerStylePop: React.CSSProperties = {
    marginBottom: '25px',
    width: '270px',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 7,
    paddingBottom: 7,
};
