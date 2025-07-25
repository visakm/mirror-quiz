import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { Planet } from "~/@types/planet";

interface ResultModeProps {
  id: string;
  src: string;
  alt: string;
  className?: string;
  planet: Planet;
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
  alt,
  className,
  planet,
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
    [
      0,
      triangleSize?.x! / 2 - imageWidth / 4,
      triangleSize?.x! - imageWidth / 2,
    ]
  );

  const translateY = useTransform(
    position,
    [-1, 0, 1],
    [0, triangleSize?.y!, 0]
  );

  const scale = useTransform(position, [-1, 0, 1], [0.8, 1.2, 0.8]);

  return (
    <motion.div
      initial={(() => {
        if (initialPosition === 0) {
          return {
            scale: 1.2,
            x: triangleSize?.x! / 2 - imageWidth / 4,
            y: triangleSize?.y!,
          };
        }
        if (initialPosition === 1) {
          return {
            scale: 0.8,
            x: triangleSize?.x! - imageWidth / 2,
            y: 0,
          };
        }
        if (initialPosition === -1) {
          return {
            scale: 0.8,
            x: -imageWidth / 2,
            y: 0,
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
      className={twMerge("cursor-pointer", className)}
      onClick={() => handleClick?.(curPos)}
    >
      <Image
        ref={imageRef}
        id={id}
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="w-[400px] h-[400px]"
      />
    </motion.div>
  );
};

export default ResultMode;
