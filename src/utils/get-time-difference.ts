import { t } from "./i18n";

export const getTimeDifference = (commentDateTime: string) => {
    const commentDate = new Date(commentDateTime);
    const currentDate = new Date();

    const timeDifference = Math.abs(commentDate.getTime() - currentDate.getTime());

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.5);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} ${t("YearAgo")}`;
    } else if (months > 0) {
        return `${months} ${t("MonthAgo")}`;
    } else if (days > 0) {
        return `${days} ${t("DayAgo")}`;
    } else if (hours > 0) {
        return `${hours} ${t("HourAgo")}`;
    } else if (minutes > 0) {
        return `${minutes} ${t("MinuteAgo")}`;
    } else {
        return `${seconds} ${t("SecondAgo")}`;
    }
};
