import { useEffect, useRef } from 'react';
import { formatPrice } from 'utils/utils';

const KakaoMap = ({ estateList, currentLocation, keyword }) => {
  const appKey = process.env.REACT_APP_KAKAO_APP_KEY;
  const container = useRef(null);

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
              } else reject();
            });
          });
        };

        const createMarkers = async (centerLatLng) => {
          if (estateList.length === 0) return;

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

                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="width:150px;text-align:center;padding:6px 0;font-size:14px">${formatPrice(
                    {
                      jeonsePrice: estate.jeonsePrice,
                      monthlyPrice: estate.monthlyPrice,
                      depositPrice: estate.depositPrice,
                      buyPrice: estate.buyPrice,
                    }
                  )}</div>`,
                });

                window.kakao.maps.event.addListener(
                  estateMarker,
                  'click',
                  () => {
                    infowindow.open(map, estateMarker);
                  }
                );

                bounds.extend(estateLatLng);
              }
            } catch (err) {
              console.error(err);
            }
          }

          map.setBounds(bounds);
        };

        if (keyword) {
          geocoder.addressSearch(keyword, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const keywordLatLng = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              map.setCenter(keywordLatLng);
              createMarkers(keywordLatLng);
            }
          });
        } else {
          const centerLatLng = map.getCenter();
          createMarkers(centerLatLng);
        }
      });
    };
  }, [currentLocation, estateList, keyword]);

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
