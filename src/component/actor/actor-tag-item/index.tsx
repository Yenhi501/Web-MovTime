import React from 'react';

interface TabItemProps {
    isActive: boolean;
    onClick: () => void;
    label: string;
}

export const TabItem: React.FC<TabItemProps> = ({ isActive, onClick, label }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        onClick();
    };
    return (
        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
            <span
                style={{ letterSpacing: '0.2' }}
                className={`text-base px-5 py-3 block leading-normal ${
                    isActive ? 'text-white bg-color-600 active' : 'text-color'
                }`}
                onClick={handleClick}
                role="tablist"
            >
                {label}
            </span>
        </li>
    );
};
