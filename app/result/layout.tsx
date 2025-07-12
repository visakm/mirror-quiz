import React from "react";
import QuizHeader from "~/templates/QuizHeader";
import StarBg from "~/templates/StarBg";

const ResultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center pb-20  h-screen">
        <StarBg src="/ResultStarBg.svg" />
        <div className="w-full h-full flex flex-col gap-y-2 items-center justify-start">
          <QuizHeader />
          {children}
        </div>
      </div>
    </>
  );
};

export default ResultLayout;
