import React from "react";
import { CheckboxLabel } from "@mirror-map/ui/components";
import WizardCheckBoxInput from "./WizardCheckBoxInput";
import WizardIntensityInput from "./WizardIntensityInput";

interface AnswerProps {
  text: string;
  answerNo: number;
  questionNo: number;
}

const Answer = ({ text, answerNo, questionNo }: AnswerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-y-2 justify-between">
      <div className="flex items-center justify-start gap-2 md:basis-3/4">
        <CheckboxLabel
          paragraph={
            <p className="body2-regular w-full peer-checked:font-semibold peer-checked:md:font-bold text-gray-900">
              {text}
            </p>
          }
          input={
            <WizardCheckBoxInput
              id={`${questionNo}-${answerNo}`}
              answerNo={answerNo}
              questionNo={questionNo}
            />
          }
          id={`${questionNo}-${answerNo}`}
        />
      </div>
      <WizardIntensityInput
        questionNo={questionNo}
        answerNo={answerNo}
        className="md:basis-1/4"
      />
    </div>
  );
};

export default Answer;
