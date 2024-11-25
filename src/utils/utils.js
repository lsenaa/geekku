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
