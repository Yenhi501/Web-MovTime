export const getCurrentDateString = (date?: Date): string => {

    const currentDate = date || new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const startDate = `${day}/${month}/${year}`;
    return startDate
}


