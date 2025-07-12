"use client";
import React, { useCallback } from "react";
import { ReduxProvider } from "@mirror-map/redux";
import wizardReducer, {
  WIZARD_SLICE,
  WizardState,
  initializeQuestions,
} from "./WizardSlice";
import { useSearchParams } from "next/navigation";
import { unSerializeQuestionAnswers } from "./WizardSelectors";
import { useGetTakeQuizQuery } from "@mirror-map/apollo/generated/mirror-map.schema";

const WizardReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const takeId = searchParams.get("take_id");

  const { data: takeQuizData } = useGetTakeQuizQuery({
    variables: { input: { id: takeId! } },
    fetchPolicy: "cache-only",
    nextFetchPolicy: "cache-only",
  });

  const initializeAction = takeQuizData?.GetTakeQuiz?.options
    ? () =>
        initializeQuestions(
          unSerializeQuestionAnswers(takeQuizData?.GetTakeQuiz?.options!)
        )
    : undefined;

  return (
    <ReduxProvider<WizardState>
      staticReducer={{ [WIZARD_SLICE as string]: wizardReducer }}
      initializeAction={initializeAction}
    >
      {children}
    </ReduxProvider>
  );
};

export default WizardReduxWrapper;
