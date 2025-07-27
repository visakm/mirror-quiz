"use client";
import React from "react";
import Image from "next/image";

interface ResultTriangleProps {
  ref?: React.Ref<HTMLImageElement>;
  className?: string;
}

const ResultTriangle = ({ ref, className }: ResultTriangleProps) => {
  return (
    <Image
      src="/Triangle.svg"
      alt="result-triangle"
      width={200}
      height={200}
      className={className}
      ref={ref}
    />
  );
};

export default ResultTriangle;
