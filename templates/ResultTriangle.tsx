"use client";
import React from "react";
import Image from "next/image";

interface ResultTriangleProps {
  ref?: React.Ref<HTMLImageElement>;
}

const ResultTriangle = ({ ref }: ResultTriangleProps) => {
  return (
    <Image
      src="/Triangle.svg"
      alt="result-triangle"
      width={200}
      height={200}
      className="xl:w-[1000px] lg:w-[850px] h-auto my-auto"
      ref={ref}
    />
  );
};

export default ResultTriangle;
