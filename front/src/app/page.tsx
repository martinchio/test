"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import useRedirectIfNoPassword from "@/hooks/useRedirect";
import Inbox from "@/components/Inbox/Inbox";
import usePassword from "@/hooks/usePassword";

export default function Home() {
  useRedirectIfNoPassword();

  const [password] = usePassword();
  const router = useRouter();

  const goToEmail = useCallback(
    (id: string) => {
      router.push(`/email/${id}`);
    },
    [router],
  );

  const goToCompose = useCallback(() => {
    router.push(`/compose`);
  }, [router]);

  return (
    <Inbox goToEmail={goToEmail} goToCompose={goToCompose} token={password} />
  );
}
