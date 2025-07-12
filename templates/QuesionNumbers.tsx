import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface QuesionNumbersProps {
  currentQuestion: number;
  takeQuizId: string;
  totalQuestions: number;
}
const QuesionNumbers = ({
  currentQuestion,
  takeQuizId,
  totalQuestions,
}: QuesionNumbersProps) => {
  return (
    <div className="flex flex-row w-full justify-between items-center my-4 xl:my-9">
      {Array.from({ length: totalQuestions }, (_, index) => (
        <React.Fragment key={index}>
          <Link
            href={`/${index + 1}?take_id=${takeQuizId}`}
            className={twMerge(
              "font-bold text-sm xl:text-5xl leading-headline font-eb-garamond w-6 h-6 lg:w-12 lg:h-12 hover:scale-110  text-content-200 rounded-full flex items-center justify-center",
              index + 1 < currentQuestion
                ? "text-gray-900 number-gradient "
                : index + 1 > currentQuestion
                ? "border-2 border-gray-100"
                : "animate-pulse bg-primary-200/50"
            )}
            style={
              index + 1 === currentQuestion
                ? {
                    boxShadow: `
                        0 0 0 2px #FBDBBE,
                        0 0 0 5px rgba(251, 219, 190, 0.5),
                        0 0 0 9px rgba(251, 219, 190, 0.2)
                  `,
                  }
                : {}
            }
          >
            0{index + 1}
          </Link>
          {index == totalQuestions - 1 || (
            <div className="bg-gray-100 rounded-full py-[1px] md:py-0.5 w-5 md:w-10 lg:w-30 block -z-10" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuesionNumbers;
