import React from "react";
import QuizHeader from "~/templates/QuizHeader";
import StarBg from "~/templates/StarBg";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  items-center justify-center h-screen">
      <StarBg src="/ResultStarBg.svg" />
      <div className="relative w-full h-full flex flex-col  items-center justify-between px-3  overflow-hidden">
        <QuizHeader />
        {children}
      </div>
    </div>
  );
};

export default BookingLayout;
