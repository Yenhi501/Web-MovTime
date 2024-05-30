import { CaretRightOutlined, PauseOutlined, SettingFilled } from '@ant-design/icons';
import {
    IconDefinition,
    faCompress,
    faExpand,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfigProvider, Popover, Slider, Tooltip } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IconForward10s } from '../../asset/icon/forward-10s';
import { IconRewind10s } from '../../asset/icon/rewind-10s';
import { useToken } from '../../hooks/useToken';
import { useAppSelector } from '../../redux/hook';
import { endpoint } from '../../utils/baseUrl';
import { formatTime } from '../../utils/formatTime';
import { HandleClickProgressProps, ProgressBar } from '../progress-bar';
import { ControlPlayerType } from './control-player-type';
import {
    defaultCustomConfigSlider,
    defaultOverlayInnerStylePop,
    defaultPropsToolTip,
    defaultSettingItems,
    settingItemContentMap,
} from './default-value';
import './index.scss';
import { SettingContent } from './setting-content';
import { SettingItem } from './setting-item';

const mapIconVolume: Record<string, IconDefinition> = {
    true: faVolumeXmark,
    false: faVolumeHigh,
};

export type SettingState = {
    speed: number;
    quality: number;
};

const mapQuality: Record<number, string> = {
    720: '720p',
    1080: '1080p',
    4: '4k',
};

export const ControlPlayer = ({
    onPlayPause = () => {},
    isPlaying,
    isMuted = false,
    rewindHandle,
    forwardHandle,
    videoState,
    videoRef,
    fullscreenHandler,
    isFullscreen,
    handleVolumeChange = () => {},
    valueVolume = 0.5,
    hidden,
    setIsLoadingHidden = () => {},
    setSpeedVid = () => {},
    setSrcVideo = () => {},
    setIsOpenModal = () => {},
}: ControlPlayerType) => {
    const duration: number = videoRef?.current?.getDuration() || 0;
    const [selectedSetting, setSelectedSetting] = useState('');
    const [stateSetting, setStateSetting] = useState<SettingState>({ speed: 1, quality: 720 });
    const [isSelectedSettingIcon, setIsSelectedSettingIcon] = useState(false);
    const durationDefault: number = useAppSelector((state) => state.videoWatching.durationDefault);
    const episodeId = useAppSelector((state) => state.videoWatching.episodeId);
    const { accessToken } = useToken();

    useEffect(() => {
        videoRef?.current?.seekTo(durationDefault / duration, 'fraction');
    }, [durationDefault, duration]);

    useEffect(() => {}, [stateSetting.quality]);

    const getQualityVid = (quality: number) => {
        setIsLoadingHidden(false);
        axios
            .get(`${endpoint}/api/episode/qualities/${Number(episodeId)}`, {
                params: {
                    quality: mapQuality[quality],
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                console.log(res);
                setStateSetting({ ...stateSetting, quality: quality });
                setSrcVideo(res.data.data.videoUrl);
                setIsLoadingHidden(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoadingHidden(true);

                if (err.response.status === 403) {
                    setIsOpenModal(true);
                    setIsLoadingHidden(false);
                }
            });
    };

    const handleSettingSelection = (value: number) => {
        const settingMap: Record<string, any> = {
            speed: () => {
                setStateSetting({ ...stateSetting, speed: value });
                setSpeedVid(value);
            },
            quality: () => {
                getQualityVid(value);
            },
        };
        settingMap[selectedSetting]();
        setSelectedSetting('');
    };

    const handleClickProgress = (props: HandleClickProgressProps) => {
        const { event, ref } = props;
        if (ref != null && ref.current != null && event != null) {
            const rect = ref.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;
            videoRef?.current?.seekTo(x / width, 'fraction');
            setIsLoadingHidden(false);
        }
    };

    const { played, playedSeconds, loadedSeconds } = useAppSelector((state) => state.videoWatching);

    useEffect(() => {
        setIsLoadingHidden(true);
    }, [played]);

    return (
        <div className="control-player" hidden={hidden}>
            <ProgressBar
                percent={played}
                className="control-player-progress"
                handleClick={(props) => handleClickProgress(props)}
                duration={duration}
                loadedSeconds={loadedSeconds}
            />
            <div className="featured-container">
                <div className="feature feature-left">
                    <Tooltip
                        title={`${isPlaying === true ? 'Dừng' : 'Phát'}`}
                        {...defaultPropsToolTip}
                    >
                        <div className="feature-item feature-left-item" onClick={onPlayPause}>
                            {isPlaying === true ? (
                                <PauseOutlined className="text-3xl" />
                            ) : (
                                <CaretRightOutlined className="text-3xl" />
                            )}
                        </div>
                    </Tooltip>
                    <Tooltip title={`Lùi 10s`} {...defaultPropsToolTip}>
                        <div className="feature-item feature-left-item" onClick={rewindHandle}>
                            <IconRewind10s width={30} height={28} />
                        </div>
                    </Tooltip>
                    <Tooltip title={`Tới 10s`} {...defaultPropsToolTip}>
                        <div className="feature-item feature-left-item" onClick={forwardHandle}>
                            <IconForward10s width={30} height={28} />
                        </div>{' '}
                    </Tooltip>

                    <div className="feature-item feature-left-item flex feature-volume items-center">
                        <Tooltip
                            title={`${isMuted === true ? 'Bật âm' : 'Tắt âm'}`}
                            {...defaultPropsToolTip}
                        >
                            <FontAwesomeIcon
                                icon={mapIconVolume[(valueVolume === 0).toString()]}
                                size="lg"
                                onClick={() => {
                                    if (valueVolume === 0) {
                                        handleVolumeChange(0.5);
                                    } else {
                                        handleVolumeChange(0);
                                    }
                                }}
                                className="block"
                                width={35}
                                height={35}
                            />
                        </Tooltip>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Slider: defaultCustomConfigSlider,
                                },
                            }}
                        >
                            <Slider
                                value={valueVolume * 100}
                                onChange={(value) => handleVolumeChange(value / 100)}
                                className="progress-slider"
                            />
                        </ConfigProvider>
                    </div>
                    <Tooltip title={`Thời gian`} {...defaultPropsToolTip}>
                        <div className="feature-item feature-left-item">
                            <span>
                                {formatTime(Number(playedSeconds?.toFixed()))} /{' '}
                                {formatTime(Number(duration?.toFixed()))}
                            </span>
                        </div>{' '}
                    </Tooltip>
                </div>
                <div className="feature feature-right">
                    <Popover
                        content={() =>
                            settingItemContentMap[selectedSetting] != null ? (
                                <SettingContent
                                    title={settingItemContentMap[selectedSetting].title}
                                    options={settingItemContentMap[selectedSetting].options}
                                    onBack={() => setSelectedSetting('')}
                                    onSelected={(value) => handleSettingSelection(value)}
                                />
                            ) : (
                                <SettingItem
                                    items={defaultSettingItems}
                                    onSelected={(value) => setSelectedSetting(value as string)}
                                    currValue={Object.values(stateSetting)}
                                />
                            )
                        }
                        trigger="click"
                        arrow={false}
                        placement="topRight"
                        overlayInnerStyle={defaultOverlayInnerStylePop}
                        color="#171a18e6"
                        onOpenChange={() => {
                            setSelectedSetting('');
                            setIsSelectedSettingIcon(!isSelectedSettingIcon);
                        }}
                        zIndex={10}
                    >
                        <div className="feature-item feature-right-item">
                            <SettingFilled
                                className={`text-2xl ${
                                    isSelectedSettingIcon !== false ? 'rotate-45' : ''
                                } transition-transform `}
                            />
                        </div>
                    </Popover>

                    <Tooltip title={`Phóng to`} {...defaultPropsToolTip}>
                        <div
                            className="feature-item feature-right-item"
                            onClick={fullscreenHandler}
                        >
                            {isFullscreen ? (
                                <FontAwesomeIcon icon={faCompress} size="xl" className="mb-1" />
                            ) : (
                                <FontAwesomeIcon icon={faExpand} size="xl" className="mb-1" />
                            )}
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
