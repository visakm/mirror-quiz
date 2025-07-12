import QuizHeader from "~/templates/QuizHeader";
import StarBg from "~/templates/StarBg";
import {
  TopRightCorner,
  TopLeftCorner,
  BottomLeftCorner,
  BottomRightCorner,
} from "~/templates/Corner";

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center pb-20">
        <StarBg src="/WizardStarBg.svg" />
        <TopRightCorner className="w-30 lg:w-100 backdrop-blur-sm" />
        <TopLeftCorner className="w-30 lg:w-100 backdrop-blur-sm" />
        <BottomLeftCorner className="w-30 lg:w-100 backdrop-blur-sm" />
        <BottomRightCorner className="w-30 lg:w-100 backdrop-blur-sm" />
        <div className="w-full h-full flex flex-col gap-y-2 items-center justify-start">
          <QuizHeader />
          <div className="relative border-gradient backdrop-blur-[40px] bg-primary-100/15 shadow-lg rounded-3xl px-1 py-1 md:px-3 md:py-3 lg:px-4 lg:py-4  w-11/12">
            <TopRightCorner className="w-30 lg:w-60" />
            <TopLeftCorner className="w-30 lg:w-60" />
            <BottomLeftCorner className="w-30 lg:w-60" />
            <BottomRightCorner className="w-30 lg:w-60" />
            <div className=" flex flex-col items-center justify-center px-2 md:px-3 lg:px-4  lg:gap-y-10 border-gradient rounded-3xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionLayout;
