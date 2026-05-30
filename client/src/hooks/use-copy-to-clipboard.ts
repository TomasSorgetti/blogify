import { useState } from "react";
import toast from "react-hot-toast";

export function useCopyToClipboard(timeout = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), timeout);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy failed", err);
    }
  };

  return { copiedId, copy, isCopied: (id: string) => copiedId === id };
}
