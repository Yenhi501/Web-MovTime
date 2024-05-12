import React, { ReactNode } from 'react';
import './index.scss';

export type IconWithText = {
    icon: ReactNode;
    text: string;
    className?: string;
    onClick?: () => void;
    scrollToSectionId?: string;
};
export const IconWithText = ({ icon, text, className, scrollToSectionId }: IconWithText) => {
    const handleIconClick = () => {
        if (scrollToSectionId) {
            const section = document.getElementById(scrollToSectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    };
    return (
        <div className={`wrapper-icon ${className}`} onClick={handleIconClick}>
            {icon}
            <p className="icon-desc">{text}</p>
        </div>
    );
};
