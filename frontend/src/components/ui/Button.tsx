import type { ButtonProps } from "@/types/interfaces";
import React, { memo } from "react";

const Button: React.FC<ButtonProps> = ({
  className,
  value,
  imageUrl,
  classNameImage,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` cursor-pointer transition justify-between flex py-2 px-4 h-10 rounded-lg hover:opacity-70 items-center gap-1 ${className} ${
        imageUrl ? "min-w-28" : "w-auto"
      }`}
    >
      <div className="dark:text-gray-200 text-sm mb-0.5 md:text-[16px] font-medium leading-none">
        {value}
      </div>
      {!!imageUrl && (
        <img
          src={imageUrl}
          className={`object-contain shrink-0 h-4 ${classNameImage}`}
        />
      )}
    </button>
  );
};

export default memo(Button);
