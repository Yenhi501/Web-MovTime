import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

export type ValueSpeed = {
    label: string;
    value: number;
};

export type SettingContentData = {
    title?: string;
    options: ValueSpeed[];
};

export type SettingContent = {
    onSelected?: (props?: any) => void;
    onBack?: (props?: any) => void;
    className?: string;
};
export const SettingContent = ({
    title,
    options,
    onSelected = () => {},
    onBack,
    className,
}: SettingContent & SettingContentData) => {
    return (
        <div className={`setting-content-container overflow-hidden ${className}`}>
            <div className="text-slate-50 py-3 px-3 cursor-pointer" onClick={onBack}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <span className="inline-block ml-2">{title}</span>
            </div>
            <hr className="border-zinc-500" />
            <div className="setting-main-content text-slate-50 font-thin overflow-auto max-h-64 mt-2">
                {options?.map((item, index) => (
                    <div
                        key={index}
                        className="px-8 py-3 hover:bg-zinc-700/[.5] cursor-pointer"
                        onClick={() => onSelected(item.value)}
                    >
                        {item.label}
                        {item.label === '1080p' || item.label === '4k+HDR' ? (
                            <span className="text-red-600 font-normal">&nbsp;VIP</span>
                        ) : (
                            ''
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
