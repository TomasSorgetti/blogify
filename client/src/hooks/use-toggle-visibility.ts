import { useState } from "react";

export function useToggleVisibility() {
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isVisible = (id: string) => !!visibleItems[id];

  return { visibleItems, toggle, isVisible };
}
