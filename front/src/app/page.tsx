"use client";
import usePassword from "@/hooks/usePassword";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Email from "@/components/Email/Email";

export default function Home() {
  const [password] = usePassword();
  const router = useRouter();

  if (!router) {
    return null;
  }

  useEffect(() => {
    if (!password) {
      router.push("/password");
    }
  }, [password, router]);

  return <Email token={password} />;
}
