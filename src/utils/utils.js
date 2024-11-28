import { hangjungdong } from './hangjungdong';

export const formatEstateType = (type) => {
  switch (type) {
    case 'farmHouse':
      return '시골농가주택';
    case 'countryHouse':
      return '전원주택';
    case 'apt':
      return '아파트/오피스텔';
    case 'land':
      return '농장/토지';
    default:
      return;
  }
};

export const formatRentType = (rentType) => {
  switch (rentType) {
    case 'jeonse':
      return '전세';
    case 'monthly':
      return '월세';
    case 'buy':
      return '매매';
    default:
      return;
  }
};

export const formatPrice = ({
  jeonsePrice,
  monthlyPrice,
  depositPrice,
  buyPrice,
}) => {
  if (jeonsePrice) {
    return `전세 ${jeonsePrice.toLocaleString()}`;
  }
  if (monthlyPrice) {
    return `월세 ${depositPrice.toLocaleString()}/${monthlyPrice}`;
  }
  if (buyPrice) {
    return `매매 ${buyPrice.toLocaleString()}`;
  }
};

export const formatDate = (date) => {
  let newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = String(newDate.getMonth() + 1).padStart(2, '0');
  let day = String(newDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// 매물 검색 - 지역 키워드 찾기
export const searchByKeyword = (keyword) => {
  const { sido, sigugun, dong } = hangjungdong;

  if (!keyword) return [];

  const results = [];

  // 1. 시/도로 검색
  const targetSido = sido.find((si) => si.codeNm.includes(keyword));
  if (targetSido) {
    const targetGuns = sigugun.filter((gun) => gun.sido === targetSido.sido);

    targetGuns.forEach((gun) => {
      const targetDongs = dong.filter(
        (d) => d.sigugun === gun.sigugun && d.sido === gun.sido // sido와 sigugun 모두 확인
      );
      targetDongs.forEach((d) => {
        results.push(`${targetSido.codeNm} ${gun.codeNm} ${d.codeNm}`);
      });
    });

    return results.sort();
  }

  // 2. 시군구로 검색
  const targetGuns = sigugun.filter((gun) => gun.codeNm.includes(keyword));
  if (targetGuns.length) {
    targetGuns.forEach((gun) => {
      const targetSi = sido.find((si) => si.sido === gun.sido);
      const targetDongs = dong.filter(
        (d) => d.sigugun === gun.sigugun && d.sido === gun.sido
      );

      if (targetSi) {
        targetDongs.forEach((d) => {
          results.push(`${targetSi.codeNm} ${gun.codeNm} ${d.codeNm}`);
        });
      }
    });

    return results.sort();
  }
  // 3. 동 이름으로 검색
  const targetDongs = dong.filter((d) => d.codeNm.includes(keyword));
  if (targetDongs.length) {
    targetDongs.forEach((d) => {
      const targetGun = sigugun.find(
        (gun) => gun.sigugun === d.sigugun && gun.sido === d.sido
      );
      const targetSi = sido.find((si) => si.sido === targetGun?.sido);

      if (targetSi && targetGun) {
        results.push(`${targetSi.codeNm} ${targetGun.codeNm} ${d.codeNm}`);
      }
    });
  }

  return results.sort();
};

export const processLocation = (location) => {
  const replacements = {
    광역시: '',
    충청북도: '충북',
    충청남도: '충남',
    전라북도: '전북',
    전라남도: '전남',
    경상북도: '경북',
    경상남도: '경남',
  };

  let processedKeyword = location || '';
  Object.keys(replacements).forEach((key) => {
    processedKeyword = processedKeyword.replace(key, replacements[key]);
  });

  return processedKeyword.trim();
};
