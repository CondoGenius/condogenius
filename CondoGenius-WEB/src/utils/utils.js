export const FormatDate = (date) => {
    const dateValue = new Date(date);
    let  dateFormatted = dateValue instanceof Date && !isNaN(dateValue)
    ? dateValue.toISOString().split('T')[0] : '';
    return dateFormatted;
};

export const FormatDateZone = (date) => {
    const dateValue = new Date(date);
    if (dateValue instanceof Date && !isNaN(dateValue)) {
        const day = String(dateValue.getDate()).padStart(2, '0');
        const month = String(dateValue.getMonth() + 1).padStart(2, '0');
        const year = dateValue.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        return '';
    }
};
