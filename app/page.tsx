"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (
      localStorage.getItem("token") === undefined ||
      !localStorage.getItem("token")
    ) {
      return router.push("/login");
    }
  }, []);
  return <div>Hello</div>;
}
