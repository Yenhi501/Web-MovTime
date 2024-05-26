import React from 'react';
import './index.scss';

export type SubInfo = {
    title: string;
    content: Array<string>;
    className?: string;
};
export const SubInfo = ({ title, content, className }: SubInfo) => {
    return (
        <div className={`sub-info-container ${className}`}>
            <span className="sub-info-title">{title}:</span>
            &nbsp;
            <span className="sub-info-content">{content}</span>
        </div>
    );
};
