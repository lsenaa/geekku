import { useEffect, useRef } from 'react';
import { formatEstateType, formatPrice } from 'utils/utils';

const KakaoMap = ({ estateList, currentLocation, keyword }) => {
  const appKey = process.env.REACT_APP_KAKAO_APP_KEY;
  const container = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container.current, mapOptions);
        const geocoder = new window.kakao.maps.services.Geocoder();
        const bounds = new window.kakao.maps.LatLngBounds();

        // 기존 마커 제거 함수
        const removeMarkers = () => {
          markers.current.forEach((marker) => {
            marker.setMap(null);
          });
          markers.current = [];
        };

        const calculateLatLng = (estate) => {
          const estateAddress = estate.address2
            ? `${estate.address1} ${estate.address2}`
            : estate.address1;

          return new Promise((resolve, reject) => {
            geocoder.addressSearch(estateAddress, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const latLng = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );
                resolve(latLng);
              } else {
                console.error('Address Not Found:', estateAddress);
                reject(new Error(`Address search failed: ${status}`));
              }
            });
          });
        };

        const createMarkers = async (centerLatLng) => {
          // 기존 마커 제거
          removeMarkers();

          console.log('Creating markers, Estate List:', estateList);

          if (!estateList || estateList.length === 0) {
            console.log('No estates to create markers for');
            return;
          }

          for (const estate of estateList) {
            try {
              const estateLatLng = await calculateLatLng(estate);
              const distance = calculateDistance(
                {
                  latitude: centerLatLng.getLat(),
                  longitude: centerLatLng.getLng(),
                },
                {
                  latitude: estateLatLng.getLat(),
                  longitude: estateLatLng.getLng(),
                }
              );

              if (distance <= 10) {
                const estateMarker = new window.kakao.maps.Marker({
                  position: estateLatLng,
                  map: map,
                  title: estate.title,
                });

                const customOverlay = new window.kakao.maps.CustomOverlay({
                  content: `<div style="width:100px;text-align:center;padding:6px 0;border:1px solid #6d885d;border-radius:10px;background-color:white;display:flex;flex-direction:column;align-items:flex-end;">
                  <button id="closeOverlay" style="margin-right:4px;border:none;background-color: transparent;">×</button>
                  <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
                  <p style="font-size:10px;margin-bottom:8px;">
                  ${formatEstateType(estate.type)}
                  </p>
                  <p style="font-size:12px;font-weight:bold;color:#696969;">
                  ${formatPrice({
                    jeonsePrice: estate.jeonsePrice,
                    monthlyPrice: estate.monthlyPrice,
                    depositPrice: estate.depositPrice,
                    buyPrice: estate.buyPrice,
                  })}
                  </p>
                  </div>
                  </div>`,
                  position: estateLatLng,
                  yAnchor: 1.2,
                });

                window.kakao.maps.event.addListener(
                  estateMarker,
                  'click',
                  () => {
                    customOverlay.setMap(map);
                  }
                );
                window.kakao.maps.event.addListener(
                  customOverlay,
                  'click',
                  () => {
                    customOverlay.setMap(null);
                  }
                );
                document.addEventListener('click', (event) => {
                  if (event.target.id === 'closeOverlay') {
                    customOverlay.setMap(null);
                  }
                });

                markers.current.push(estateMarker);
                bounds.extend(estateLatLng);
              }
            } catch (err) {
              console.error(err);
            }
          }

          map.setBounds(bounds);
        };

        // 검색어에 따른 지도 중심 설정 및 마커 생성
        console.log('keyword: ' + keyword);

        // 지도 중심 설정 및 마커 생성
        const setCenterAndMarkers = (searchKeyword) => {
          if (searchKeyword) {
            geocoder.addressSearch(searchKeyword, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const centerLatLng = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );
                map.setCenter(centerLatLng);
                createMarkers(centerLatLng);
              }
            });
          } else {
            const centerLatLng = map.getCenter();
            createMarkers(centerLatLng);
          }
        };

        // 조건에 따라 지도 중심 및 마커 설정
        if (keyword !== '') {
          setCenterAndMarkers(keyword); // 키워드로 검색
        } else {
          createMarkers(map.getCenter()); // 기본 위치로 검색
        }
      });
    };
  }, [estateList, keyword]);

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
