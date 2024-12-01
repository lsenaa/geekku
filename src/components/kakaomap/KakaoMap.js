import useGeoLocation from 'hook/useGeoLocation';
import { useEffect, useRef } from 'react';
import { formatPrice } from 'utils/utils';

const KakaoMap = ({ estateList, currentLocation }) => {
  const appKey = process.env.REACT_APP_KAKAO_APP_KEY;
  const container = useRef(null);
  const location = useGeoLocation();

  useEffect(() => {
    if (!container.current) return;

    // 1. Kakao SDK 불러오기
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    // 2. script가 로드되면 실행
    script.onload = () => {
      if (location) {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(
              currentLocation.latitude,
              currentLocation.longitude
            ), // 초기 위치

            level: 3,
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container.current, options);

          // Geocoder 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 10km 내 매물 필터링
          estateList.forEach((estate) => {
            geocoder.addressSearch(
              `${estate.address1} ${estate.address2}`,
              (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const estateLatLng = new window.kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                  );
                  const distance = calculateDistance(location, {
                    latitude: result[0].y,
                    longitude: result[0].x,
                  });

                  if (distance <= 10) {
                    // 10km 이내의 매물만 마커 생성
                    const estateMarker = new window.kakao.maps.Marker({
                      position: estateLatLng,
                      map: map,
                      title: estate.title,
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시
                    let infowindow = new window.kakao.maps.InfoWindow({
                      content: `<div style="width:150px;text-align:center;padding:6px 0;">${formatPrice(
                        {
                          jeonsePrice: estate.jeonsePrice,
                          monthlyPrice: estate.monthlyPrice,
                          depositPrice: estate.depositPrice,
                          buyPrice: estate.buyPrice,
                        }
                      )}</div>`,
                    });
                    infowindow.open(map, estateMarker);
                    // 지도의 중심을 결과값으로 받은 위치로 이동
                    map.setCenter(estateMarker.getPosition());
                  }
                }
              }
            );
          });
        });
      }
    };
  }, [currentLocation, estateList]);

  // 두 위치 사이의 거리를 계산하는 함수 (단위: km)
  const calculateDistance = (loc1, loc2) => {
    const radLat1 = (loc1.latitude * Math.PI) / 180;
    const radLat2 = (loc2.latitude * Math.PI) / 180;
    const deltaLat = radLat2 - radLat1;
    const deltaLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const R = 6371; // 지구의 반지름 (단위: km)
    return R * c;
  };

  return <div style={{ width: '60%', height: '945px' }} ref={container}></div>;
};

export default KakaoMap;
