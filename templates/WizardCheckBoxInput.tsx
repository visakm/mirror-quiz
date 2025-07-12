"use client";

import React, { useCallback } from "react";
import { CheckboxInput } from "@mirror-map/ui/components";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { checkAnswer } from "~/providers/redux/WizardSlice";
import { makeSelectAnswer } from "~/providers/redux/WizardSelectors";

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
  const selectAnswer = makeSelectAnswer(questionNo, answerNo);
  const answer = useAppSelector(selectAnswer);

  const handleChange = useCallback(() => {
    dispatch(checkAnswer({ questionNo, answerNo }));
  }, [questionNo, answerNo]);

  return (
    <CheckboxInput
      id={id}
      checked={!!answer}
      value={answerNo}
      handleChange={handleChange}
      className="peer"
    />
  );
};

export default WizardCheckBoxInput;
