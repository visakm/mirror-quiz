import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@mirror-map/redux";
import { WizardState, Question } from "./WizardSlice";

const selectQuestions = (state: RootState<WizardState>) =>
  state.WIZARD?.questions;

export const findAnswerInState = (
  questions: Question[] | undefined,
  questionNo: number,
  answerNo: number
) => {
  return questions
    ?.find(
      (answer) =>
        answer.questionNo === questionNo &&
        answer.answers.some((a) => a.answerNo === answerNo)
    )
    ?.answers.find((a) => a.answerNo === answerNo);
};

export const serilizaeQuestionAnswers = (
  questions: Question[],
  questionNo: number
) => {
  const answer = questions.find(
    (answer) => answer.questionNo === questionNo
  )?.answers;

  const answerToIntensity = answer!.reduce((prev, curr) => {
    return {
      [questionNo.toString()]: {
        ...prev[questionNo.toString()],
        [curr.answerNo!.toString()]: curr.intensity!.toString(),
      },
    };
  }, {} as Record<string, Record<string, string>>);

  return answerToIntensity;
};

export const unSerializeQuestionAnswers = (
  options: Record<string, Record<string, number>>
): Question[] => {
  return Object.entries(options).map(([questionNo, answerIntensity]) => {
    return {
      questionNo: parseInt(questionNo),
      answers: Object.entries(answerIntensity).map(([answerNo, intensity]) => {
        return {
          answerNo: parseInt(answerNo),
          intensity: intensity,
        };
      }),
    };
  });
};

// Memoized selector factory (returns a selector for specific questionNo and answerNo)
export const makeSelectAnswer = (questionNo: number, answerNo: number) =>
  createSelector(selectQuestions, (questions) =>
    findAnswerInState(questions, questionNo, answerNo)
  );
