import { useEffect } from "react";
import { useRouter } from "next/navigation";

import usePassword from "@/hooks/usePassword";

const useRedirectIfNoPassword = () => {
  const [password] = usePassword();
  const router = useRouter();

  useEffect(() => {
    if(router) {
      if (!password) {
        router.push("/password");
      }
    }
  }, [password, router]);
};

export default useRedirectIfNoPassword;
