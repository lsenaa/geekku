import { useState } from 'react';

export const useAgreements = () => {
  const [agreements, setAgreements] = useState({
    ageConfirmed: false,
    termsAccepted: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const validateAgreements = () => {
    if (!agreements.ageConfirmed) {
      alert('만 14세 이상임을 확인해주세요.');
      return false;
    }
    if (!agreements.termsAccepted) {
      alert('이용약관 및 개인정보 수집에 동의해주세요.');
      return false;
    }
    return true;
  };

  return { agreements, handleCheckboxChange, validateAgreements };
};
