import ReactPlayer from 'react-player';
import { VideoWatching } from '../../redux/videoSlice';

export type ControlPlayerType = {
    onPlayPause?: (props?: any) => void;
    isPlaying?: boolean;
    isMuted?: boolean;
    rewindHandle?: (props?: any) => void;
    forwardHandle?: (props?: any) => void;
    videoState?: VideoWatching;
    videoRef?: React.MutableRefObject<ReactPlayer | null>;
    fullscreenHandler: (props?: any) => void;
    isFullscreen?: boolean;
    handleVolumeChange?: (props?: any) => void;
    valueVolume?: number;
    hidden?: boolean;
    setIsLoadingHidden?: (props?: any) => void;
    setSpeedVid?: (props?: any) => void;
    setSrcVideo?: (props?: any) => void;
    setIsOpenModal?: (props?: any) => void;
};
