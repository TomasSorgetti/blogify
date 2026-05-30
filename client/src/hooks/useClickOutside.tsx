import { useEffect, type RefObject } from "react";

type UseClickOutsideOptions = {
  closeOnEsc?: boolean;
};

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  { closeOnEsc = true }: UseClickOutsideOptions = {}
): void {
  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;

      if (ref.current && target && !ref.current.contains(target)) {
        callback();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    if (closeOnEsc) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      if (closeOnEsc) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, callback, closeOnEsc]);
}
