import React, { useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";

import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { planState, currDate } from "../../../lib/constants/plandata";

const Polyline = ({
  destList,
  getCarDirection,
  polyLineList,
  setPolyLineList,
}) => {
  const map = useMap();

  const curr = useRecoilValue(currDate);

  useEffect(() => {
    polyLineList.map((polyLine) => {
      polyLine.setMap(null);
    });

    for (let i = 0; i < destList.length; i++) {
      if (destList.length === 1) {
        break;
      }
      if (i === destList.length - 1) {
        break;
      }
      getCarDirection(map, destList[i], destList[i + 1]);
    }
  }, [destList]);

  return <div></div>;
};

export default Polyline;
