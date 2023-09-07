import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
  title: string;
  type?: "button" | "submit";
  LeftIcon?: string | null;
  RightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
};

const Button = ({
  title,
  type,
  LeftIcon,
  RightIcon,
  isSubmitting,
  handleClick,
  textColor,
  bgColor,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      onClick={handleClick}
      className={`flexCenter gap-3 px-4 py-3 ${textColor || "text-white"} ${
        isSubmitting ? `bg-black/50` : bgColor || "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full`}
    >
      {LeftIcon && (
        <Image
          src={LeftIcon}
          alt="left icon"
          width={14}
          height={14}
        />
      )}
      {title}
      {RightIcon && (
        <Image
          src={RightIcon}
          alt="right icon"
          width={14}
          height={14}
        />
      )}
    </button>
  );
};

export default Button;
