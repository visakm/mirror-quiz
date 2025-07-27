import React from "react";
import Image from "next/image";

const StarBg = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="Mirror & Map"
      fill
      priority
      className="fixed inset-0 w-full  object-cover -z-10 opacity-50"
    />
  );
};

export default StarBg;
