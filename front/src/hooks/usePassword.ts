import { useState, useEffect } from "react";

const PASSWORD_KEY = "saved_password";

function usePassword(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [password, setPassword] = useState<string>(() => {
    if(typeof window === "undefined") return "";
    return localStorage.getItem(PASSWORD_KEY) || "";
  });

  useEffect(() => {
    if (password) {
      localStorage.setItem(PASSWORD_KEY, password);
    } else {
      localStorage.removeItem(PASSWORD_KEY);
    }
  }, [password]);

  return [password, setPassword];
}

export default usePassword;
