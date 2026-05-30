import React from "react";
import { XIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all`}>
        <header className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
