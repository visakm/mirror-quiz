"use client";

import React, { useCallback } from "react";
import { CheckboxInput } from "@mirror-map/ui/components";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { checkAnswer } from "~/providers/redux/WizardSlice";

interface WizardCheckBoxInputProps {
  id: string;
  answerNo: number;
  questionNo: number;
}

const WizardCheckBoxInput = ({
  id,
  answerNo,
  questionNo,
}: WizardCheckBoxInputProps) => {
  const dispatch = useAppDispatch();

  const answers = useAppSelector(
    (state) =>
      state.WIZARD.questions.find((q) => q.questionNo === questionNo)?.answers
  );

  const answer = answers?.find((a) => a.answerNo === answerNo);

  const handleChange = useCallback(() => {
    dispatch(checkAnswer({ questionNo, answerNo }));
  }, [questionNo, answerNo]);

  return (
    <CheckboxInput
      id={id}
      checked={Boolean(answer)}
      value={answerNo}
      handleChange={handleChange}
      className="peer"
      disabled={
        answers?.length && answers?.length >= 3 && !Boolean(answer)
          ? true
          : false
      }
    />
  );
};

export default WizardCheckBoxInput;
