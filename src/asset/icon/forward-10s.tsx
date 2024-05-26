import { SVGProps } from 'react';

export const IconForward10s = ({
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
                d="M23.93 41.41V23a.09.09 0 00-.16-.07s-2.58 3.69-4.17 4.78"
                strokeLinecap="round"
            ></path>
            <rect x="29.19" y="22.52" width="11.41" height="18.89" rx="5.7"></rect>
            <path
                strokeLinecap="round"
                d="M54.43 15.41l-2.6 8.64-8.64-2.61M51.86 23.94a21.91 21.91 0 10.91 13.25"
            ></path>
        </svg>
    );
};
