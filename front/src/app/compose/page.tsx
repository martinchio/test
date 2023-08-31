"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import ComposeEmail from "@/components/ComposeEmail/ComposeEmail";
import GoBackHeader from "@/components/GoBackHeader/GoBackHeader";
import usePassword from "@/hooks/usePassword";
import { sendEmail } from "@/services/email";
import { NewEmail } from "@/types/email";

const ComposePage = () => {
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.push("/");
  }, [router]);

  const [password] = usePassword();
  const onSubmit = async (data: NewEmail) => {
    await sendEmail(data, password);
  };

  return (
    <div>
      <GoBackHeader />
      <ComposeEmail onSubmit={onSubmit} onSuccess={onSuccess} />
    </div>
  );
};

export default ComposePage;
