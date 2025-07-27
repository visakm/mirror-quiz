"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import ResultMode from "./ResultMode";
import ResultTriangle from "./ResultTriangle";

interface ResultPlanetsProps {
  take_id: string;
}

const ResultPlanets = ({ take_id }: ResultPlanetsProps) => {
  const trangleRef = useRef<HTMLImageElement>(null);
  // +1 : clockwise
  // -1 : counter-clockwise
  const [direction, setDirection] = useState<number[]>([0]);
  const [triangleSize, setTriangleSize] = useState({ x: 0, y: 0 });

  // Update triangle size when the image loads
  useLayoutEffect(() => {
    const updateTriangleSize = () => {
      if (trangleRef.current) {
        setTriangleSize({
          x: trangleRef.current.clientWidth,
          y: trangleRef.current.clientHeight,
        });
      }
    };

    const triangle = trangleRef.current;
    if (triangle) {
      // Update size immediately if image is already loaded
      updateTriangleSize();

      // Listen for image load event
      triangle.addEventListener("load", updateTriangleSize);

      // Cleanup
      return () => {
        triangle.removeEventListener("load", updateTriangleSize);
      };
    }
  }, []);

  const handleClick = useCallback((position: number) => {
    setDirection((prev) => [...prev, position]);
  }, []);

  return (
    <div className="relative lg:mb-40 lg:mt-20">
      {triangleSize.x > 0 && triangleSize.y > 0 && (
        <>
          <ResultMode
            id="shadow-mode"
            take_id={take_id}
            src="/Venus.png"
            name="SHADOW"
            initialPosition={0}
            direction={direction}
            triangleSize={triangleSize}
            handleClick={handleClick}
            className="absolute -bottom-[40%] right-[10%] md:right-[23%] lg:-bottom-[40%] lg:right-[30%] transform-gpu"
          />
          <ResultMode
            id="primary-mode"
            take_id={take_id}
            src="/Venus.png"
            name="PRIMARY"
            initialPosition={-1}
            direction={direction}
            triangleSize={triangleSize}
            handleClick={handleClick}
            className="absolute -bottom-[40%] right-[10%]  md:right-[23%] lg:-bottom-[40%] lg:right-[30%] transform-gpu"
          />
          <ResultMode
            id="supporting-mode"
            take_id={take_id}
            src="/Venus.png"
            name="SUPPORTING"
            initialPosition={+1}
            direction={direction}
            triangleSize={triangleSize}
            handleClick={handleClick}
            className="absolute -bottom-[40%] right-[10%]  md:right-[23%]  lg:-bottom-[40%] lg:right-[30%] transform-gpu"
          />
        </>
      )}
      <ResultTriangle
        className=" xl:w-[1000px] lg:w-[800px] md:w-[550px] w-[350px] h-80 md:h-auto my-auto object-cover lg:object-fill object-center"
        ref={trangleRef}
      />
    </div>
  );
};

export default ResultPlanets;
