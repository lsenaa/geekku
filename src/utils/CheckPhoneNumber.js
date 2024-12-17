export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return;

  const formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  return formatted.replace(/-+$/, '');
};

export const applyPhoneFormat = (value) => {
  return formatPhoneNumber(value);
};
