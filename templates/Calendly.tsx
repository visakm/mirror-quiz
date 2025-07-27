"use client";
import React from "react";

const Calendly = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <div
        className="calendly-inline-widget w-full h-full my-auto rounded-lg absolute top-[10%] md:top-auto"
        data-url="https://calendly.com/m-m-davaeiha?background_color=ecaebd&text_color=331663&primary_color=D0345B"
      ></div>
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </>
  );
};

export default Calendly;
