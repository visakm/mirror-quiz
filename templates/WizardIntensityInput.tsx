"use client";

import React, { useCallback } from "react";
import { Range } from "@mirror-map/ui/components";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setIntensity } from "~/providers/redux/WizardSlice";
import { makeSelectAnswer } from "~/providers/redux/WizardSelectors";

interface WizardIntensityInputProps {
  questionNo: number;
  answerNo: number;
  className?: string;
}

const WizardIntensityInput = ({
  questionNo,
  answerNo,
  className,
}: WizardIntensityInputProps) => {
  const dispatch = useAppDispatch();

  const selectAnswer = makeSelectAnswer(questionNo, answerNo);
  const answer = useAppSelector(selectAnswer);

  const handleChange = useCallback(
    (intensity: number) => {
      dispatch(setIntensity({ questionNo, answerNo, intensity }));
    },
    [questionNo, answerNo]
  );

  return (
    <Range
      min={0}
      max={10}
      value={answer?.intensity || 0}
      disabled={!Boolean(answer)}
      handleChange={handleChange}
      className={className}
    />
  );
};

export default WizardIntensityInput;
