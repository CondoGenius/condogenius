export const FormatDate = (date) => {
    const dateValue = new Date(date);
    let  dateFormatted = dateValue instanceof Date && !isNaN(dateValue)
    ? dateValue.toISOString().split('T')[0] : '';
    return dateFormatted;
};