import { useCallback } from "react";

//recoil
import { useRecoilState } from "recoil";
import { confirmModalState } from "../lib/constants/confirmModal";

export const useConfirmModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(confirmModalState);

  const closeModal = useCallback(() => {
    setModalDataState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalDataState]);

  const openModal = useCallback(
    ({ content, callback }) => {
      setModalDataState({
        isOpen: true,
        content: content,
        callBack: callback,
      });
    },
    [setModalDataState],
  );

  // callBack이 openModal함수를 부를 때 선언되기 때문에 deps에 있어야 함.
  const isConfirm = useCallback(() => {
    modalDataState.callBack();
    setModalDataState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalDataState, modalDataState.callBack]);

  return { modalDataState, closeModal, openModal, isConfirm };
};
