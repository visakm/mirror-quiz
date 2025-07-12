"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mirror-map/ui/components";
import { useCheckQuestionMutation } from "@mirror-map/apollo/generated/mirror-map.schema";
import { useAppSelector } from "~/hooks/redux";

interface QuestionButtonsProps {
  currentQuestion: number;
  takeQuizId: string;
}

const QuestionButtons = ({
  takeQuizId,
  currentQuestion,
}: QuestionButtonsProps) => {
  const router = useRouter();
  const questions = useAppSelector((state) => state.WIZARD?.questions);
  const answersOfCurrentQuestion = questions?.find(
    (question) => question.questionNo === currentQuestion
  );

  const [checkQuestion] = useCheckQuestionMutation();

  const previousDisabled = currentQuestion === 1;
  const nextDisabled =
    !answersOfCurrentQuestion || answersOfCurrentQuestion?.answers.length === 0;

  const handleNextClick = useCallback(async () => {
    if (
      !answersOfCurrentQuestion ||
      answersOfCurrentQuestion.answers.length === 0
    )
      return;
    await checkQuestion({
      variables: {
        input: {
          take_quiz_id: takeQuizId,
          answers: answersOfCurrentQuestion.answers.map((answer) => {
            return {
              answer_no: answer.answerNo!,
              intensity: answer.intensity!,
            };
          }),
          question_no: currentQuestion,
        },
      },
      //navigation + toast notification
      onCompleted: () =>
        router.push(`/${currentQuestion + 1}?take_id=${takeQuizId}`),
    });
  }, [checkQuestion, answersOfCurrentQuestion, takeQuizId, currentQuestion]);

  const handlePreviousClick = useCallback(() => {
    router.push(`/${currentQuestion - 1}?take_id=${takeQuizId}`);
  }, [currentQuestion, takeQuizId]);

  return (
    <div className="flex items-center justify-between w-full my-6 lg:my-9 px-2">
      <Button
        text="Previous"
        disabled={previousDisabled}
        handleClick={handlePreviousClick}
      />
      <Button
        text="Check"
        disabled={nextDisabled}
        handleClick={handleNextClick}
      />
    </div>
  );
};

export default QuestionButtons;
