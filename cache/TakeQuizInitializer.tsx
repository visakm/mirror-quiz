"use client";

import { useEffect, useRef } from "react";

import {
  GetTakeQuizDocument,
  GetTakeQuizQuery,
} from "@mirror-map/apollo/generated/mirror-map.schema";
import { useApolloClient } from "@apollo/client";

interface TakeQuizCacheProps {
  children: React.ReactNode;
  takeQuizData: GetTakeQuizQuery["GetTakeQuiz"];
}

const TakeQuizInitializer = ({
  children,
  takeQuizData,
}: TakeQuizCacheProps) => {
  const { cache } = useApolloClient();
  const cacheWritten = useRef(false);
  useEffect(() => {
    if (takeQuizData?.options && !cacheWritten.current) {
      cacheWritten.current = true;
      cache.writeQuery({
        query: GetTakeQuizDocument,
        variables: { input: { id: takeQuizData.id } },
        data: {
          GetTakeQuiz: takeQuizData,
        },
      });
    }
  }, [takeQuizData, cacheWritten]);

  return children;
};

export default TakeQuizInitializer;
