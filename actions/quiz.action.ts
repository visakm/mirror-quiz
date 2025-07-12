"use server";

import { getClient } from "@mirror-map/apollo/client/ssr";
import {
  QuizDocument,
  QuizQuery,
  GetTakeQuizQuery,
  GetTakeQuizDocument,
  GetTakeQuizQueryVariables,
} from "@mirror-map/apollo/generated/mirror-map.schema";

export async function TakeQuizAction(takeQuizId: string): Promise<{
  quiz: QuizQuery["Quiz"];
  takeQuiz: GetTakeQuizQuery["GetTakeQuiz"];
}> {
  const apollo = getClient();

  const { data: queryData } = await apollo.query<QuizQuery>({
    query: QuizDocument,
    fetchPolicy: "cache-first",
  });

  const { data: takeQuizData } = await apollo.query<
    GetTakeQuizQuery,
    GetTakeQuizQueryVariables
  >({
    query: GetTakeQuizDocument,
    fetchPolicy: "cache-first",
    variables: {
      input: {
        id: takeQuizId,
      },
    },
  });

  return { quiz: queryData.Quiz, takeQuiz: takeQuizData.GetTakeQuiz };
}
