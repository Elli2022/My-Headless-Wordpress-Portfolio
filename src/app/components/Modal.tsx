"use client"

import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; 

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-10 bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="relative p-6 mx-auto w-full h-full"
      >
        <button
          onClick={onDismiss}
          className="absolute top-10 right-14 text-white text-4xl"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
