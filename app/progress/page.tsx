"use client";
import { startProgress } from "@/core/signalRService";
import React, { useEffect } from "react";
import { Progress } from "@nextui-org/progress";
import { useAppContext } from "@/providers/app.provider";
import { Button } from "@nextui-org/button";

const Page = () => {
  const appContext = useAppContext();

  return (
    <div>
      <Progress
        value={appContext.progress}
        size="md"
        color="primary"
        showValueLabel={true}
        className="max-w-md"
      />
      <Button className="mt-5" onClick={()=>startProgress()}>
        Start progress
      </Button>
    </div>
  );
};

export default Page;
