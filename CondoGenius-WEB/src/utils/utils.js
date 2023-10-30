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

export const CpfMask = (value) => {
  if (!value) return "";

  value=value.replace(/\D/g,"");
  value=value.replace(/(\d{3})(\d)/,"$1.$2");
  value=value.replace(/(\d{3})(\d)/,"$1.$2");
  value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

  return value;
};

export const PhoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
};

export const VerifyQuantityDays = (date) => {
  const publicationDate = new Date(date);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - publicationDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysDiff === 0) {
    return 'hoje'
  } else if (daysDiff === 1) {
    return 'há 1 dia'
  } else {
    return `há ${daysDiff} dias`
  }


};