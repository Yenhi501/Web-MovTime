export function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursFormat = hours >= 1 ? (hours < 10 ? '0' : '') + hours + ':' : ''
    const minutesFormat = (minutes < 10 ? '0' : '') + minutes + ':'
    const remainingSecondsFormat = (remainingSeconds < 10 ? '0' : '') + remainingSeconds

    const formattedTime = hoursFormat + minutesFormat + remainingSecondsFormat


    return formattedTime;
}