import React, { useEffect } from "react";
// recoil
import { dndHoverState } from "../../lib/constants/dnd";
import { useResetRecoilState } from "recoil";
// react-dnd
import { useDrag } from "react-dnd";
// icon
import saveBtn from "../../assets/icons/saveBtn.png";

const PlaceCard = ({ data, planHandler }) => {
  const resetDndHover = useResetRecoilState(dndHoverState);

  const image = data.image;
  const name = data.name;
  const address = data.address;
  const isSave = data.isSave;

  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      // drag할 요소의 type을 지정
      type: "PLACECARD",
      // Container에서 props로 넘겨준 요소의 id와 id를 가지고 state 내의 실제 index를
      // Card가 사용할 수 있도록 넘겨준다.
      item: { name },
      // collect 옵션을 넣지 않으면 dragging 중일 때 opacity가 적용되지 않는다!
      collect: (monitor) => ({
        // isDragging 변수가 현재 드래깅중인지 아닌지를 true/false로 리턴한다
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        // console.log(item);
        const didDrop = monitor.didDrop();
        if (didDrop) {
          // 계획 추가

          // 초기화
          resetDndHover();
        }
      },
    }),
    [name],
  );

  return (
    <li
      className="flex h-[18%] justify-between gap-4 bg-slate-100 p-3"
      ref={dragRef}
      style={{ opacity: isDragging ? "0.3" : "1" }}
    >
      <img src="image" alt="장소 사진" />

      <div className="grow">
        <p>{name}</p>
        <p>{address}</p>
        <p>평점??</p>
      </div>
      <img src={saveBtn} alt="보관" className="h-[60%] " />
    </li>
  );
};

export default PlaceCard;
