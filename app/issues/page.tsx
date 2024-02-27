"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssuesPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("issues/new-issue")}>New Issue</Button>
    </div>
  );
};

export default IssuesPage;
