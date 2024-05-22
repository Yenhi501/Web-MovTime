
export const getNextDateByMonth = (nextMonth: number) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return new Date(currentYear, currentMonth + nextMonth, currentDate.getDate());

}