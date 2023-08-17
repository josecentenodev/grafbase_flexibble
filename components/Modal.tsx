"use client";
import { useCallback, useRef, ReactNode, ReactElement } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleClick = () => {};
  const onDismiss = () => {};
  return (
    <div
      ref={overlay}
      className="modal"
      onClick={handleClick}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image
          src="/close.svg"
          alt="close image"
          width={75}
          height={75}
        />
      </button>
      <div>{children}</div>
    </div>
  );
};
