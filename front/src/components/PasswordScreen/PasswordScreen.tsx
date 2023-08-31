"use client";
import { useState } from "react";

import usePassword from "@/hooks/usePassword";
import { getEmails } from "@/services/email";
import Button from "@/components/Generics/Button";

const PasswordComponent = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = usePassword();
  const [tempPass, setTempPass] = useState(password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setError(null);
    setLoading(true);
    try {
      //Test if pass works
      await getEmails("sent", tempPass);
      //if so save it and run onSuccess
      setPassword(tempPass);
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 500);
      //if not show error
    } catch (error) {
      console.error(error);
      setError("Password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white  w-full max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Fill in Your Password</h2>
      <input
        type="password"
        onChange={(e) => setTempPass(e.target.value)}
        value={tempPass}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-300"
      />
      <Button onClick={handleSave} loading={loading}>
        Save
      </Button>
      {showSuccess && <p className="text-green-500 mt-2">Password Saved</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PasswordComponent;
