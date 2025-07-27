"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mirror-map/ui/components";
import {
  GetTakeQuizDocument,
  useCheckQuestionMutation,
  useGetTakeQuizQuery,
} from "@mirror-map/apollo/generated/mirror-map.schema";
import { useAppSelector } from "~/hooks/redux";

interface WizardButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  takeQuizId: string;
}

const WizardButtons = ({
  takeQuizId,
  currentQuestion,
  totalQuestions,
}: WizardButtonsProps) => {
  const router = useRouter();
  const questions = useAppSelector((state) => state.WIZARD?.questions);
  const answersOfCurrentQuestion = questions?.find(
    (question) => question.questionNo === currentQuestion
  );

  const [checkQuestion] = useCheckQuestionMutation();

  const { data: takeQuizData } = useGetTakeQuizQuery({
    variables: {
      input: {
        id: takeQuizId,
      },
    },
    fetchPolicy: "cache-only",
    nextFetchPolicy: "cache-only",
  });

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
      //update the cache with the checked question data
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GetTakeQuizDocument,
          variables: { input: { id: takeQuizId } },
          data: { GetTakeQuiz: data?.CheckQuestion },
        });
      },
      //navigation + toast notification
      onCompleted: (data) => {
        if (data.CheckQuestion.completed_at) {
          router.push(`/result?take_id=${takeQuizId}`);
        } else {
          router.push(`/${currentQuestion + 1}?take_id=${takeQuizId}`);
        }
      },
    });
  }, [
    checkQuestion,
    answersOfCurrentQuestion,
    takeQuizId,
    currentQuestion,
    totalQuestions,
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
        text={
          Object.keys(takeQuizData?.GetTakeQuiz.options || {}).length ===
          totalQuestions - 1
            ? "Finish"
            : "Next"
        }
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
