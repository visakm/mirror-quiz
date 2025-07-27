import React from "react";
import QuizHeader from "~/templates/QuizHeader";
import StarBg from "~/templates/StarBg";

const ResultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" w-full flex flex-col items-center justify-center lg:pb-20 min-h-screen max-w-screen">
        <StarBg src="/ResultStarBg.svg" />
        <div className="h-full w-full flex flex-col gap-y-48 md:gap-y-60 lg:gap-y-2 items-center justify-between py-3 overflow-hidden">
          <QuizHeader />
          {children}
        </div>
      </div>
    </>
  );
};

export default ResultLayout;
