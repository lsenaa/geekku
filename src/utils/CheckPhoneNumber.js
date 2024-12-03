export const formatPhoneNumber = (phone) => {
  return phone
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, (_, p1, p2, p3) =>
      [p1, p2, p3].filter(Boolean).join('-')
    )
    .trim();
};

export const applyPhoneFormat = (name, value, setUser, user) => {
  if (name === 'phone') {
    const formattedPhone = formatPhoneNumber(value);
    if (formattedPhone) {
      setUser({ ...user, phone: formattedPhone });
    }
  }
};
