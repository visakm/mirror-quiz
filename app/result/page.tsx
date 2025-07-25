import React from "react";
import ResultButtons from "~/templates/ResultButtons";
import ResultPlanets from "~/templates/ResultPlanets";

interface ResultPageProps {
  searchParams: Promise<{ take_id: string }>;
}

const ResultPage = async ({ searchParams }: ResultPageProps) => {
  const { take_id } = await searchParams;

  return (
    <>
      <ResultPlanets />
      <div className="flex items-center justify-between w-full -mt-20">
        <ResultButtons take_id={take_id} />
      </div>
    </>
  );
};

export default ResultPage;
