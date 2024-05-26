import React, { SVGProps } from 'react';

export const IconRewind10s = ({
    className,
    width = 32,
    height = 32,
    color = '#fff',
}: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            strokeWidth="2.5"
            stroke={color}
            fill="none"
            width={width}
            height={height}
            className={`duration-300 transform transition-all ${className}`}
        >
            <path
                strokeLinecap="round"
                d="M9.57 15.41l2.6 8.64 8.64-2.61M26.93 41.41V23a.09.09 0 00-.16-.07s-2.58 3.69-4.17 4.78"
                color=""
            ></path>
            <rect x="32.19" y="22.52" width="11.41" height="18.89" rx="5.7"></rect>
            <path d="M12.14 23.94a21.91 21.91 0 11-.91 13.25" strokeLinecap="round"></path>
        </svg>
    );
};
