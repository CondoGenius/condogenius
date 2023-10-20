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

export const FormatPhone = (phone) => {
    const number = phone.replace(/\D/g, '');
  
    if (number.length === 8) {
      return number.slice(0, 4) + '-' + number.slice(4);
    } else if (number.length === 9) {
      return number[0] + '-' + number.slice(1, 5) + '-' + number.slice(5);
    } else {
      return number;
    }
};
  
