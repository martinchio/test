"use client";
import React from "react";
import PasswordComponent from "@/components/PasswordScreen/PasswordScreen";

import { useRouter } from "next/navigation";

const PasswordEnterScreen = () => {
  const router = useRouter();
  return <PasswordComponent onSuccess={() => router.push("/")} />;
};

export default PasswordEnterScreen;
