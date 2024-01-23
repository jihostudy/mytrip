import React from "react";

import { useConfirmModal } from "../../hook/useConfirmModal";

const ConfirmModal = () => {
  const { modalDataState, closeModal, isConfirm } = useConfirmModal();

  return (
    <>
      {modalDataState.isOpen && (
        <div className="bg-modalBackground fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center">
          <div className=" fixed z-0 flex h-1/4 w-1/2 max-w-lg flex-col items-center justify-center rounded-lg bg-blue-100 p-4">
            <div className="flex grow items-center">
              <p className="text-xl">{modalDataState.content}</p>
            </div>
            <div className="flex w-1/5 justify-center gap-3">
              <button
                className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] text-xs shadow-[0_0_40px_0px_#FFCB16]"
                onClick={isConfirm}
              >
                예
              </button>
              <button
                className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] text-xs shadow-[0_0_40px_0px_#FFCB16]"
                onClick={closeModal}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
