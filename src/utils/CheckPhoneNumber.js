export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }
};

export const applyPhoneFormat = (name, value, setUser, user) => {
  if (name === 'phone') {
    const formattedPhone = formatPhoneNumber(value);
    if (formattedPhone) {
      setUser({ ...user, phone: formattedPhone });
    }
  }
};
