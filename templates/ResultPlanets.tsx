"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import ResultMode from "./ResultMode";
import ResultTriangle from "./ResultTriangle";
import { Planet } from "~/@types/planet";

const ResultPlanets = () => {
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
    <div className="relative mb-40 mt-20">
      {triangleSize.x > 0 && triangleSize.y > 0 && (
        <>
          <ResultMode
            id="shadow-mode"
            src="/Shadow.png"
            alt="Shadow"
            planet={Planet.SHADOW}
            initialPosition={0}
            direction={direction}
            triangleSize={triangleSize}
            handleClick={handleClick}
            className="absolute -top-[40%] -left-[10%]"
            // className="absolute -bottom-[40%] right-[30%] w-80"
          />
          <ResultMode
            id="primary-mode"
            src="/Primary.png"
            alt="primary"
            planet={Planet.PRIMARY}
            initialPosition={-1}
            direction={direction}
            triangleSize={triangleSize}
            handleClick={handleClick}
            className="absolute -top-[40%] -left-[10%]"
            // className="absolute -top-[40%] -left-[10%] w-80 h-80"
          />
          <ResultMode
            id="supporting-mode"
            src="/Supporting.png"
            alt="supporting"
            planet={Planet.SUPPORTING}
            initialPosition={+1}
            direction={direction}
            triangleSize={triangleSize}
            handleClick={handleClick}
            className="absolute -top-[40%] -left-[10%]"
            // className="absolute -top-[40%] -right-[10%] w-80 h-80"
          />
        </>
      )}
      <ResultTriangle ref={trangleRef} />
    </div>
  );
};

export default ResultPlanets;
