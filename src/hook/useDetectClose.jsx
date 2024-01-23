import { useEffect, useState } from "react";

export const useDetectClose = (elem, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", outsideClick);
    }

    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, [isOpen, elem]);
  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function outsideClick(e) {
    if (isOpen && elem.current && !elem.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  return [isOpen, setIsOpen, toggleDropdown];
};
