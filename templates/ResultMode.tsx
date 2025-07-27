import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useGetTakeQuizQuery } from "@mirror-map/apollo/generated/mirror-map.schema";

interface ResultModeProps {
  id: string;
  src: string;
  name: string;
  take_id: string;
  className?: string;
  triangleSize?: {
    x: number;
    y: number;
  };
  initialPosition: number;
  direction: number[];
  handleClick?: (position: number) => void;
}

const ResultMode = ({
  id,
  src,
  name,
  className,
  take_id,
  initialPosition,
  triangleSize,
  direction,
  handleClick,
}: ResultModeProps) => {
  // +1 : right
  // 0 : center
  // -1 : left
  const position = useMotionValue(initialPosition);
  const imageRef = useRef<HTMLImageElement>(null);

  const [curPos, setCurPos] = useState(initialPosition);

  const { data: takeQuizData } = useGetTakeQuizQuery({
    variables: {
      input: {
        id: take_id,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });

  const mantra =
    takeQuizData?.GetTakeQuiz?.result?.[
      name == "PRIMARY"
        ? "primary_mode"
        : name == "SUPPORTING"
        ? "supporting_mode"
        : "shadow_mode"
    ]?.archetype?.mantra;

  useMotionValueEvent(position, "change", () => {
    setCurPos(position.get());
  });

  const [imageWidth, setImageWidth] = useState(0);

  useLayoutEffect(() => {
    const updateImageWidth = () => {
      if (imageRef.current) {
        setImageWidth(imageRef.current.width);
      }
    };

    const image = imageRef.current;
    if (image) {
      // Update size immediately if image is already loaded
      updateImageWidth();

      // Listen for image load event
      image.addEventListener("load", updateImageWidth);

      // Cleanup
      return () => {
        image.removeEventListener("load", updateImageWidth);
      };
    }
  }, []);

  useLayoutEffect(() => {
    if (direction[direction.length - 1] == 0) return;

    if (direction[direction.length - 1] == -1) {
      switch (position.get()) {
        case 0:
          position.set(+1);
          return;
        case 1:
          position.set(-1);
          return;
        case -1:
          position.set(0);
          return;
      }
    }
    if (direction[direction.length - 1] == 1) {
      switch (position.get()) {
        case 0:
          position.set(-1);
          return;
        case 1:
          position.set(0);
          return;
        case -1:
          position.set(+1);
          return;
      }
    }
  }, [direction, position]);

  const translateX = useTransform(
    position,
    [-1, 0, 1],
    [triangleSize?.x! / 2, 0, -triangleSize?.x! / 2]
  );

  const translateY = useTransform(
    position,
    [-1, 0, 1],
    [-triangleSize?.y!, 0, -triangleSize?.y!]
  );

  const scale = useTransform(position, [-1, 0, 1], [0.8, 1.2, 0.8]);

  return (
    <motion.div
      initial={(() => {
        if (initialPosition === 0) {
          return {
            scale: 1.2,
            x: 0,
            y: 0,
          };
        }
        if (initialPosition === 1) {
          return {
            scale: 0.8,
            x: triangleSize?.x! - imageWidth / 2,
            y: -triangleSize?.y!,
          };
        }
        if (initialPosition === -1) {
          return {
            scale: 0.8,
            x: -(triangleSize?.x! - imageWidth / 2),
            y: -triangleSize?.y!,
          };
        }
      })()}
      animate={{
        scale: scale.get(),
        x: translateX.get(),
        y: translateY.get(),
      }}
      transition={{
        scale: {
          duration: 4,
          type: "spring",
          bounce: 0.3,
        },
        x: {
          duration: 4,
          type: "spring",
          bounce: 0.3,
        },
        y: {
          duration: 4,
          bounce: 0.3,
          type: "spring",
        },
      }}
      className={twMerge("cursor-pointer relative", className)}
      onClick={() => handleClick?.(curPos)}
    >
      <Image
        ref={imageRef}
        id={id}
        src={src}
        alt={name}
        width={400}
        height={400}
        className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] object-cover"
      />
      <p
        className={twMerge(
          "absolute text-gradient bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] text-2xl md:text-3xl xl:text-5xl font-eb-garamond font-bold",
          curPos === 0 && "-translate-y-[30%]"
        )}
      >
        {name}
      </p>
      {curPos === 0 && (
        <motion.p
          className={twMerge(
            "absolute text-primary-500 text-center bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] text-base xl:text-3xl font-eb-garamond font-semibold",
            curPos === 0 && "translate-y-[100%]"
          )}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            opacity: {
              duration: 1,
              type: "spring",
              delay: 0.5,
              bounce: 0.3,
            },
          }}
        >
          {mantra}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ResultMode;
