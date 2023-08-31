"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import usePassword from "@/hooks/usePassword";
import { getEmail } from "@/services/email";
import Spinner from "@/components/Generics/Spinner";
import { Email } from "@/types/email";

const EmailPage = ({ params }: { params: { id: string } }) => {
  const [password] = usePassword();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<Email | null>(null);

  useEffect(() => {
    try {
      getEmail(params.id, password).then((res) => {
        setEmail(res);
      });
    } catch (error) {
      console.log(error);
      setError("Error fetching email");
    } finally {
      setLoading(false);
    }
  }, [params.id, password]);

  return (
    <div>
      <div className="border-b mb-4 ">
        <div className="mb-4">
          <Link
            className="text-md font-semibold cursor-pointer px-2 py-1 bg-purple-200 rounded hover:bg-purple-300"
            href={"/"}
          >
            Back
          </Link>
        </div>
      </div>
      {email ? (
        <>
          <div className="flex justify-between mb-4">
            <div>
              <span className="text-xl font-semibold">From:</span>
              <span className="text-gray-700 ml-2">{email.From}</span>
            </div>
            <span className="text-sm text-gray-500">{email.createdAt}</span>
          </div>
          <div className="mb-4">
            <span className="text-xl font-semibold">To:</span>
            <span className="text-gray-700 ml-2">{email.To}</span>
          </div>
          <div className="mb-4">
            <span className="text-xl font-semibold">Subject:</span>
            <span className="text-gray-700 ml-2">{email.Subject}</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="text-gray-700 mb-4">{email.Body}</div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="text-right text-sm text-gray-500">
            Type: {email.Type}
          </div>
        </>
      ) : (
        <div className="w-full h-64 flex items-center justify-center">
          {loading ? <Spinner /> : <div>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default EmailPage;
