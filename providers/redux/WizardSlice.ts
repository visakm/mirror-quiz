import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Answer {
  answerNo?: number;
  intensity?: number;
}

export interface Question {
  questionNo: number;
  answers: Answer[];
}

export type WizardState = {
  questions: Question[];
};

const initialState: WizardState = {
  questions: [],
};

export const WIZARD_SLICE = "WIZARD";

const wizardSlice = createSlice({
  name: WIZARD_SLICE,
  initialState,
  reducers: {
    checkAnswer: (
      state,
      action: PayloadAction<{
        questionNo: number;
        answerNo: number;
      }>
    ) => {
      const existingQuestionBefore = state.questions.find(
        (question) => question.questionNo === action.payload.questionNo
      );

      //push the new question
      if (!Boolean(existingQuestionBefore)) {
        state.questions.push({
          questionNo: action.payload.questionNo,
          answers: [
            {
              answerNo: action.payload.answerNo,
            },
          ],
        });
        return;
      }

      const existingAnswer = existingQuestionBefore?.answers.find(
        (a) => a.answerNo === action.payload.answerNo
      );

      //push the new answer
      if (!Boolean(existingAnswer)) {
        existingQuestionBefore?.answers.push({
          answerNo: action.payload.answerNo,
        });
        return;
      } else {
        //remove exsiting one
        const newAnswers = existingQuestionBefore!.answers.filter(
          (a) => a.answerNo !== action.payload.answerNo
        );
        if (newAnswers.length === 0) {
          state.questions = state.questions.filter(
            (q) => q.questionNo !== action.payload.questionNo
          );
          return;
        }
        existingQuestionBefore!.answers = newAnswers;
      }
    },
    setIntensity: (
      state,
      action: PayloadAction<{
        questionNo: number;
        answerNo: number;
        intensity: number;
      }>
    ) => {
      const existingQuestionBefore = state.questions.find(
        (question) => question.questionNo === action.payload.questionNo
      );

      if (!Boolean(existingQuestionBefore)) {
        state.questions.push({
          questionNo: action.payload.questionNo,
          answers: [
            {
              answerNo: action.payload.answerNo,
              intensity: action.payload.intensity,
            },
          ],
        });
      }

      const existingIntensity = existingQuestionBefore?.answers.find(
        (a) => a.answerNo === action.payload.answerNo
      );

      if (!Boolean(existingIntensity)) {
        existingQuestionBefore?.answers.push({
          answerNo: action.payload.answerNo,
          intensity: action.payload.intensity,
        });
      } else {
        existingIntensity!.intensity = action.payload.intensity;
      }
    },
    initializeQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    resetAnswers: (state) => {
      state.questions = [];
    },
  },
});

export const { checkAnswer, setIntensity, resetAnswers, initializeQuestions } =
  wizardSlice.actions;

export default wizardSlice.reducer;
