import React from "react";
import Image from "next/image";

const QuizHeader = () => {
  return (
    <header className="flex z-0 justify-center py-3 xl:py-6 w-full">
      <Image
        src="/QuizHeader.svg"
        alt="Mirror & Map"
        width={400}
        height={400}
        className="z-10 backdrop-blur-none w-60 xl:w-96"
      />
    </header>
  );
};

export default QuizHeader;
