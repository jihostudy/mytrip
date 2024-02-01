import React, { useState } from "react";

import { useConfirmModal } from "../../hook/useConfirmModal";

const ConfirmModal = () => {
  const { modalDataState, closeModal, isConfirm } = useConfirmModal();
  const [isHovered, setIsHovered] = useState(false);
  // 예 css
  const yes = !isHovered
    ? "w-1/2 text-[#38C3FF] hover:font-bold"
    : "w-1/2 text-black hover:font-bold";
  //content
  const content = modalDataState.content.split("\n").map((line) => (
    <p key={line}>
      {line}
      <br />
    </p>
  ));
  return (
    <>
      {modalDataState.isOpen && (
        <div className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-modalBackground">
          <form
            className=" fixed z-0 flex h-1/4 w-1/2 max-w-lg flex-col items-center justify-center rounded-lg bg-white p-4"
            onSubmit={(e) => {
              e.preventDefault();
              isConfirm();
            }}
          >
            <div className="flex grow items-center">
              <div className="flex h-3/5 flex-col items-center justify-center text-xl">
                {content}
              </div>
            </div>
            <div className="flex h-2/5 w-4/5 justify-center gap-3 border-t-1 border-solid border-[#BDBDBD]">
              <input className="w-0 border-0 bg-none" type="submit" />
              <button className={yes}>예</button>
              <button
                className="w-1/2 hover:font-bold hover:text-[#EB4315]"
                onClick={closeModal}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                아니오
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
