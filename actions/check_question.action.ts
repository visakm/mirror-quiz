"use server";

import { getClient } from "@mirror-map/apollo/client/ssr";
import {
  CheckQuestionDocument,
  CheckQuestionMutation,
  CheckQuestionMutationVariables,
  AnswerInput,
} from "@mirror-map/apollo/generated/mirror-map.schema";

export async function CheckQuestionAction(
  question_no: number,
  answers: AnswerInput[]
): Promise<CheckQuestionMutation["CheckQuestion"]> {
  const apollo = getClient();

  const { data } = await apollo.mutate<
    CheckQuestionMutation,
    CheckQuestionMutationVariables
  >({
    mutation: CheckQuestionDocument,
    variables: {
      input: {
        question_no,
        answers,
        take_quiz_id: "1",
      },
    },
  });

  return data?.CheckQuestion!;
}
