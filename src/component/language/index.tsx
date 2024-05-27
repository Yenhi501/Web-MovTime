import { CaretDownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { changeLanguage, getCurrentLanguage } from '../../utils/localization';
import { languages } from './constants';

interface LanguageItem {
    key: string;
    label: string;
    flag: string;
}

const Language = () => {
    const [visible, setVisible] = useState(false);

    const selectedLanguage = languages.find(
        (lang: LanguageItem) => lang.key === getCurrentLanguage(),
    );

    const selectedLabel = (
        <>
            {selectedLanguage && selectedLanguage.flag && (
                <img src={selectedLanguage.flag} alt={selectedLanguage.label} className="w-6" />
            )}
            {selectedLanguage ? selectedLanguage.label : languages[0]?.label}
        </>
    );

    const handleMenuClick = ({ key }: { key: string }) => {
        changeLanguage(key);
    };

    const renderDesktopContent = () => (
        <StyledDropdown
            dropdownRender={() => (
                <StyledMenu
                    className="top-2 left-4 !p-0 !rounded-none !border-none !rounded-b-lg"
                    onClick={handleMenuClick}
                >
                    {languages.map((lang: LanguageItem) => (
                        <Menu.Item key={lang.key}>
                            <li className="flex items-center !text-sell-heading font-medium !text-base px-3 py-[6px]">
                                {lang.flag && (
                                    <img src={lang.flag} alt={lang.label} className="w-6 mr-3" />
                                )}
                                {lang.label}
                            </li>
                        </Menu.Item>
                    ))}
                </StyledMenu>
            )}
            placement="bottomCenter"
            onOpenChange={setVisible}
            className="flex max-lg:hidden "
        >
            <a className="relative hover:text-link dropdown-item flex gap-1 items-center justify-center hover:cursor-pointer">
                {/* <GlobalOutlined /> */}
                <Space className="font-medium !text-base ml-1">{selectedLabel}</Space>
                <StyledIcon style={{ transform: visible ? 'rotate(180deg)' : 'none' }} />
            </a>
        </StyledDropdown>
    );

    return <div className="mr-3">{renderDesktopContent()}</div>;
};

export default Language;

const StyledDropdown = styled(Dropdown)`
    &:hover {
        .dropdown-item {
            color: red;
        }

        .anticon {
            transform: rotate(180deg);
        }
    }
`;

const StyledMenu = styled(Menu)`
    .ant-dropdown-menu-item-active.ant-dropdown-menu-item:hover {
        color: red;
        border-radius: 0px;
    }

    .ant-dropdown-menu-title-content > li:hover,
    .ant-dropdown-menu-title-content > li:active,
    .ant-dropdown-menu-title-content > li:focus {
        color: red !important;
    }
`;

const StyledIcon = styled(CaretDownOutlined)`
    font-size: 10px;
    width: max-content;
    transition: transform 0.3s ease-in-out;
    position: absolute;
    left: 105%;
    bottom: 25%;
`;
