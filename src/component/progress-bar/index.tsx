import React, { useRef, useState } from 'react';
import './index.scss';
import { useAppSelector } from '../../redux/hook';

export interface HandleClickProgressProps {
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>;
    ref?: React.RefObject<HTMLDivElement>;
}

export type ProgressBar = {
    percent?: number;
    className?: string;
    handleClick?: (props: HandleClickProgressProps) => void;
    duration?: number;
    loadedSeconds?: number;
};
export const ProgressBar = ({
    percent = 0,
    className,
    handleClick = () => {},
    duration = 1,
    loadedSeconds = 0,
}: ProgressBar) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className={`progress-bar-container ${className}`}
            onClick={(e) => {
                handleClick({ event: e, ref: containerRef });
            }}
        >
            <div
                className="progress-bar-line progress-bar-line-loaded"
                style={{ width: `${(loadedSeconds * 100) / duration}%` }}
            ></div>
            <div className="progress-bar-line" style={{ width: `${percent}%` }}></div>
        </div>
    );
};
