import React from "react";
import { notFound } from "next/navigation";
import { TakeQuizAction } from "~/actions/quiz.action";
import Question from "~/templates/Question";
import QuesionNumbers from "~/templates/QuesionNumbers";
import Answer from "~/templates/Answer";
import QuestionButtons from "~/templates/QuestionButtons";
import TakeQuizInitializer from "~/cache/TakeQuizInitializer";

interface QuestionPageProps {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ take_id: string }>;
}

const QuestionPage = async ({ params, searchParams }: QuestionPageProps) => {
  const { number } = await params;
  const { take_id } = await searchParams;

  const { quiz, takeQuiz } = await TakeQuizAction(take_id);

  const question = quiz.questions.find((q) => q.number === +number);

  if (!question) {
    notFound();
  }

  return (
    <TakeQuizInitializer takeQuizData={takeQuiz}>
      <QuesionNumbers
        takeQuizId={take_id}
        currentQuestion={question.number}
        totalQuestions={quiz.questions.length}
      />
      <Question question={question!} />
      <div className="flex flex-col w-full gap-6 py-6 md:py-0">
        {question.answers.map((answer) => (
          <Answer
            key={answer.number}
            {...{
              text: answer.text,
              answerNo: answer.number,
              questionNo: question.number,
            }}
          />
        ))}
      </div>
      <QuestionButtons
        {...{
          takeQuizId: take_id,
          currentQuestion: question.number,
        }}
      />
    </TakeQuizInitializer>
  );
};

export default QuestionPage;
