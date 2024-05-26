import React from 'react';

interface TabItemProps {
    isActive: boolean;
    onClick: () => void;
    href: string;
    label: string;
}

export const TabItem: React.FC<TabItemProps> = ({
    isActive,
    onClick,
    href,
    label,
}) => {
    return (
        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
                style={{ letterSpacing: '0.2' }}
                className={`text-base px-5 py-3 block leading-normal ${
                    isActive ? 'text-white bg-color-600 active' : 'text-color'
                }`}
                onClick={onClick}
                href={href}
                role="tablist"
            >
                {label}
            </a>
        </li>
    );
};
