import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface CornerProps {
  className?: string;
}

const TopRightCorner = ({ className }: CornerProps) => {
  return (
    <Image
      src="/Corner/TopRight.svg"
      alt="Mirror & Map"
      width={100}
      height={100}
      className={twMerge("absolute top-0 right-0  opacity-50 -z-10", className)}
    />
  );
};

const TopLeftCorner = ({ className }: CornerProps) => {
  return (
    <Image
      src="/Corner/TopLeft.svg"
      alt="Mirror & Map"
      width={100}
      height={100}
      className={twMerge(
        "absolute top-0 left-0 lg:w-100 opacity-50 -z-10",
        className
      )}
    />
  );
};

const BottomLeftCorner = ({ className }: CornerProps) => {
  return (
    <Image
      src="/Corner/BottomLeft.svg"
      alt="Mirror & Map"
      width={100}
      height={100}
      className={twMerge(
        "absolute bottom-0 left-0 lg:w-100 opacity-50 -z-10",
        className
      )}
    />
  );
};

const BottomRightCorner = ({ className }: CornerProps) => {
  return (
    <Image
      src="/Corner/BottomRight.svg"
      alt="Mirror & Map"
      width={100}
      height={100}
      className={twMerge(
        "absolute bottom-0 right-0 lg:w-100 opacity-50 -z-10",
        className
      )}
    />
  );
};

export { TopRightCorner, TopLeftCorner, BottomLeftCorner, BottomRightCorner };
