"use client";
import React from "react";
import { Button } from "@mirror-map/ui/components";
import { useRouter } from "next/navigation";
import { useDownloadResultLazyQuery } from "@mirror-map/apollo/generated/mirror-map.schema";
import useDownload from "~/hooks/download";

interface ResultButtonsProps {
  take_id: string;
}

const ResultButtons = ({ take_id }: ResultButtonsProps) => {
  const router = useRouter();
  const handleDownload = useDownload();

  const [downloadResult] = useDownloadResultLazyQuery();

  const handleDownloadResult = async () => {
    await downloadResult({
      variables: {
        input: {
          take_quiz_id: take_id,
        },
      },
      onCompleted(data) {
        handleDownload(data.DownloadResult, "mirror-report.zip");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full gap-y-4">
        <Button
          text="Download Mirror Report"
          twButtonSize={{
            width: "w-[110.86px] md:w-[300px]",
            height: "h-[34.29px] md:h-[56px]",
          }}
          twInside1Size={{
            width: "w-[106.86px] md:w-[296px]",
            height: "h-[30.29px] md:h-[52px] ",
          }}
          twInside2Size={{
            width: "w-[102.86px] md:w-[292px]",
            height: "h-[26.29px] md:h-[46px]",
          }}
          handleClick={handleDownloadResult}
        />
        <Button
          text="Explore All Archetypes"
          twButtonSize={{
            width: "w-[110.86px] md:w-[300px]",
            height: "h-[34.29px] md:h-[56px]",
          }}
          twInside1Size={{
            width: "w-[106.86px] md:w-[296px]",
            height: "h-[30.29px] md:h-[52px] ",
          }}
          twInside2Size={{
            width: "w-[102.86px] md:w-[292px]",
            height: "h-[26.29px] md:h-[46px]",
          }}
          handleClick={() => {}}
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full gap-y-4">
        <Button
          text="Email Result"
          twButtonSize={{
            width: "w-[110.86px] md:w-[300px]",
            height: "h-[34.29px] md:h-[56px]",
          }}
          twInside1Size={{
            width: "w-[106.86px] md:w-[296px]",
            height: "h-[30.29px] md:h-[52px] ",
          }}
          twInside2Size={{
            width: "w-[102.86px] md:w-[292px]",
            height: "h-[26.29px] md:h-[46px]",
          }}
          handleClick={() => {}}
        />
        <Button
          text="Book a Mirror Reading"
          twButtonSize={{
            width: "w-[110.86px] md:w-[300px]",
            height: "h-[34.29px] md:h-[56px]",
          }}
          twInside1Size={{
            width: "w-[106.86px] md:w-[296px]",
            height: "h-[30.29px] md:h-[52px] ",
          }}
          twInside2Size={{
            width: "w-[102.86px] md:w-[292px]",
            height: "h-[26.29px] md:h-[46px]",
          }}
          handleClick={() => {
            router.push("/booking");
          }}
        />
      </div>
    </>
  );
};

export default ResultButtons;
