"use client";
import React from "react";
import PasswordComponent from "@/components/Password/Password";

import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return <PasswordComponent onSuccess={() => router.push("/")} />;
};

export default page;
