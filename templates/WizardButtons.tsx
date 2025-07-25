"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mirror-map/ui/components";
import {
  useCheckQuestionMutation,
  useFinishQuizMutation,
} from "@mirror-map/apollo/generated/mirror-map.schema";
import { useAppSelector } from "~/hooks/redux";

interface WizardButtonsProps {
  currentQuestion: number;
  takeQuizId: string;
}

const WizardButtons = ({ takeQuizId, currentQuestion }: WizardButtonsProps) => {
  const router = useRouter();
  const questions = useAppSelector((state) => state.WIZARD?.questions);
  const answersOfCurrentQuestion = questions?.find(
    (question) => question.questionNo === currentQuestion
  );

  const [checkQuestion] = useCheckQuestionMutation();
  const [finishQuiz] = useFinishQuizMutation();

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

    if (currentQuestion === questions?.length) {
      await finishQuiz({
        variables: {
          input: { take_quiz_id: takeQuizId },
        },
        onCompleted: () => {
          router.push("/result");
        },
      });
      return;
    }
  }, [
    checkQuestion,
    answersOfCurrentQuestion,
    takeQuizId,
    currentQuestion,
    finishQuiz,
  ]);

  const handlePreviousClick = useCallback(() => {
    router.push(`/${currentQuestion - 1}?take_id=${takeQuizId}`);
  }, [currentQuestion, takeQuizId]);

  return (
    <div className="flex items-center justify-between w-full my-6 lg:my-9 px-2">
      <Button
        text="Previous"
        disabled={previousDisabled}
        handleClick={handlePreviousClick}
        twButtonSize={{
          width: "w-[110.86px] md:w-[190px]",
          height: "h-[34.29px] md:h-[56px]",
        }}
        twInside1Size={{
          width: "w-[106.86px] md:w-[186px]",
          height: "h-[30.29px] md:h-[52px] ",
        }}
        twInside2Size={{
          width: "w-[102.86px] md:w-[180px]",
          height: "h-[26.29px] md:h-[46px]",
        }}
      />
      <Button
        text="Next"
        disabled={nextDisabled}
        handleClick={handleNextClick}
        twButtonSize={{
          width: "w-[110.86px] md:w-[190px]",
          height: "h-[34.29px] md:h-[56px]",
        }}
        twInside1Size={{
          width: "w-[106.86px] md:w-[186px]",
          height: "h-[30.29px] md:h-[52px] ",
        }}
        twInside2Size={{
          width: "w-[102.86px] md:w-[180px]",
          height: "h-[26.29px] md:h-[46px]",
        }}
      />
    </div>
  );
};

export default WizardButtons;
