import React, { useState, useEffect } from "react";

// icon
import markerIcon from "../../../assets/icons/mapMarker.png";

// 백엔드 데이터에 맞춰서 바꾸기
// 타이틀 표시 안됨
// 일자별로 배열 조작 필요
// 마커간의 거리 표시?? 시간??
const dummy = [
  {
    title: "카카오",
    latlng: { lat: 33.450705, lng: 126.570677 },
  },
  {
    title: "생태연못",
    latlng: { lat: 33.450936, lng: 126.569477 },
  },
  {
    title: "텃밭",
    latlng: { lat: 33.450879, lng: 126.56994 },
  },
  {
    title: "근린공원",
    latlng: { lat: 33.451393, lng: 126.570738 },
  },
];

// Map
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";

const initialOption = {
  center: { lat: 33.450701, lng: 126.570667 },
  level: 13,
  isPanto: false,
};

const KakaoMap = ({ userInput }) => {
  const [mapOption, setMapOption] = useState(initialOption);

  // 마커 이벤트 컨테이너
  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // @ts-ignore
        // onClick={(marker) => map.panTo(marker.getPosition())}
        // onMouseOver={() => setIsVisible(true)}
        // onMouseOut={() => setIsVisible(false)}
        image={{
          src: markerIcon, // 마커이미지의 주소입니다
          size: {
            width: 35,
            height: 35,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 17,
              y: 17,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      >
        {/* {isVisible && content} */}
        {/* {isVisible && <div className="w-full">{content}</div>} */}
      </MapMarker>
    );
  };

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
    <>
      {/* <CustomOverlay1Style /> */}
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
      >
        {dummy.map((value, index) => (
          <React.Fragment key={value}>
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.title}
            ></EventMarkerContainer>
            <div className="z-20">
              <CustomOverlayMap
                position={{
                  lat: value.latlng.lat,
                  lng: value.latlng.lng,
                }}
              >
                <div className="label">
                  <div
                    style={{
                      zIndex: 50,
                    }}
                  >
                    <p
                      className="h-5 w-5 text-lg"
                      style={{ textAlign: "center" }}
                    >
                      {index + 1}
                    </p>
                  </div>
                </div>
              </CustomOverlayMap>
            </div>
          </React.Fragment>
        ))}

        {/* {dummy.map((position, index) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng} // 마커를 표시할 위치
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35,
            }, // 마커이미지의 크기입니다
          }}
          // title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          content={<div style={{ color: "#000" }}>{position.value}</div>}
        />
      ))} */}
      </Map>
    </>
  );
};

export default KakaoMap;
