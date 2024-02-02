import React, { useState, useEffect } from "react";

// icon
import markerIcon from "../../../assets/icons/mapMarker.png";

import Polyline from "./Polyline";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { planState, currDate } from "../../../lib/constants/plandata";

// Map
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";

const initialOption = {
  center: { lat: 33.450701, lng: 126.570667 },
  level: 13,
  isPanto: false,
};

const KakaoMap = ({ userInput }) => {
  const [mapOption, setMapOption] = useState(initialOption);
  const [destList, setDestList] = useState([]);
  const [polyLineList, setPolyLineList] = useState([]);

  const plan = useRecoilValue(planState);
  const date = useRecoilValue(currDate);
  // console.log(plan);

  // 날짜 바뀔 때마다 목적지 리스트 변경
  useEffect(() => {
    const list = plan.schedule.filter((dest) => {
      if (dest.nDay === date.currDate) {
        return dest;
      }
    });
    list.sort((a, b) => a.startTime.hour - b.startTime.hour);

    setDestList((prev) => list);
  }, [date, plan]);
  // console.log(destList);

  // 경로 표시
  async function getCarDirection(map, start, finish) {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
    // 호출방식의 URL을 입력합니다.
    const url = "https://apis-navi.kakaomobility.com/v1/directions";

    // 출발지(origin), 목적지(destination)의 좌표를 문자열로 변환합니다.
    const origin = `${start.latlng.lng},${start.latlng.lat}`;
    const destination = `${finish.latlng.lng},${finish.latlng.lat}`;

    // 요청 헤더를 추가합니다.
    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      "Content-Type": "application/json",
    };

    // 표3의 요청 파라미터에 필수값을 적어줍니다.
    const queryParams = new URLSearchParams({
      origin: origin,
      destination: destination,
    });

    const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      const linePath = [];
      data.routes[0].sections[0].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          // x,y 좌표가 우르르 들어옵니다. 그래서 인덱스가 짝수일 때만 linePath에 넣어봅시다.
          // 저도 실수한 것인데 lat이 y이고 lng이 x입니다.
          if (index % 2 === 0) {
            linePath.push(
              new kakao.maps.LatLng(
                router.vertexes[index + 1],
                router.vertexes[index],
              ),
            );
          }
        });
      });
      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 3,
        strokeColor: "#000000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });
      setPolyLineList((prev) => [...prev, polyline]);
      polyline.setMap(map);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
            // console.log("zoom out");
            setMapOption((prev) => ({
              ...prev,
              level: 13,
            }));
          }
          // #2. Move
          timer1 = setTimeout(() => {
            // console.log("move");
            setMapOption((prev) => ({
              ...prev,
              center: { lat: center.y, lng: center.x },
              isPanto: true,
            }));
          }, [400]);
          // #3. Zoom In
          timer2 = setTimeout(() => {
            // console.log("zoom in");
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
        <Polyline
          destList={destList}
          getCarDirection={getCarDirection}
          setPolyLineList={setPolyLineList}
          polyLineList={polyLineList}
        />
        {destList.map((value, index) => {
          return (
            <React.Fragment key={value + index}>
              {/* <EventMarkerContainer
                key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
                position={value.latlng}
                content={value.title}
              ></EventMarkerContainer> */}
              <div>
                <CustomOverlayMap
                  position={{
                    lat: value.latlng.lat,
                    lng: value.latlng.lng,
                  }}
                >
                  <p
                    className=" h-10 w-10 rounded-[50%] bg-yellow-300"
                    style={{ textAlign: "center", lineHeight: "2.5rem" }}
                  >
                    {index + 1}
                  </p>
                </CustomOverlayMap>
              </div>
            </React.Fragment>
          );
        })}
      </Map>
    </>
  );
};

export default KakaoMap;
