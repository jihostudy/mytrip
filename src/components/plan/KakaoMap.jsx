import React, { useState, useEffect } from "react";
// Components

// Map
import { Map } from "react-kakao-maps-sdk";

const initialOption = {
  center: { lat: 36, lng: 127.67914362121796 },
  level: 13,
  isPanto: false,
};

const KakaoMap = ({ userInput }) => {
  const [mapOption, setMapOption] = useState(initialOption);

  useEffect(() => {
    let timer1, timer2;
    if (userInput) {
      const ps = new kakao.maps.services.Places();
      const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const center = data[0];
          // const moveLocation = new kakao.maps.LatLng(center.y, center.x);
          // #1. Zoom Out
          if (mapOption.level != 13) {
            console.log("zoom out");
            setMapOption((prev) => ({
              ...prev,
              level: 13,
            }));
          }
          // #2. Move
          timer1 = setTimeout(() => {
            console.log("move");
            setMapOption((prev) => ({
              ...prev,
              center: { lat: center.y, lng: center.x },
              isPanto: true,
            }));
          }, [400]);
          // #3. Zoom In
          timer2 = setTimeout(() => {
            console.log("zoom in");
            setMapOption((prev) => ({
              ...prev,
              level: 10,
            }));
          }, [800]);
        }
      };
      ps.keywordSearch(userInput, placesSearchCB);
    }
    return () => {
      clearTimeout(timer1), clearTimeout(timer2);
    };
  }, [userInput]);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={mapOption.center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
        alignSelf: "flex-end",
      }}
      level={mapOption.level} // 지도의 확대 레벨
      isPanto={mapOption.isPanto} // 지도 이동 부드럽게?
    />
  );
};

export default KakaoMap;
