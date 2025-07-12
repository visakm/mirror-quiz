import { QuizQuery } from "@mirror-map/apollo/generated/mirror-map.schema";
import React from "react";

interface QuestionsProps {
  question: QuizQuery["Quiz"]["questions"][number];
}

const Question = ({ question }: QuestionsProps) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between gap-y-2 lg:gap-0">
      <div className="flex flex-col md:basis-3/4 lg:gap-2 gap-y-2">
        <h3 className=" headline-3 text-gray-900 md:tracking-normal md:text-start">
          {question.text}
        </h3>
        <p className="body2-regular font-bold font-eb-garamond text-content-600 italic">
          (Choose the three that feel most aligned with you.)
        </p>
      </div>
      <p className="body2-regular font-bold md:basis-1/4 font-eb-garamond text-content-600 lg:block italic ">
        How much does this part of you live with you and lead your actions day
        to day?
      </p>
    </div>
  );
};

export default Question;
