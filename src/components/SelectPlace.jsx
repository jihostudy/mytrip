import { useState } from "react";

// Components
import PlaceList from "./PlaceList";

export default function SelectPlace() {
  const [isOpen, setIsOpen] = useState(true);

  function setIsOpenHandler() {
    setIsOpen(!isOpen);
  }

  console.log(isOpen);

  return (
    <>
      <div className="flex h-screen w-1/3 items-center bg-cyan-100">
        <h1>장소를 선택하세요!!</h1>
      </div>
      {isOpen && <PlaceList />}
      <div className="flex items-center">
        <button
          className="h-5 items-center bg-slate-400"
          onClick={setIsOpenHandler}
        >
          리스트
        </button>
      </div>
    </>
  );
}
