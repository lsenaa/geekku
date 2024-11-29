export const formatCompanyNum = (companyNumber) => {
  if (!/^\d{10}$/.test(companyNumber)) {
    return null;
  }
  return `${companyNumber.slice(0, 3)}-${companyNumber.slice(3, 5)}-${companyNumber.slice(5)}`;
};

export const verifyCompanyNum = (companyNumber, setUser, user) => {
  const formattedNum = formatCompanyNum(companyNumber);
  if (formattedNum) {
    alert(`사업자등록번호 확인 완료 : ${formattedNum}`);
    setUser({ ...user, companyNumber: formattedNum });
  } else {
    alert('사업자등록번호 입력 형식이 맞지 않습니다.');
  }
};
