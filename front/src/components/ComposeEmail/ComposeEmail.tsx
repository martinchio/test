"use state";
import { useState } from "react";

import Button from "../Generics/Button";
import { NewEmail } from "@/types/email";

//JUST HTML VALIDATION For this Form
function ComposeEmail({
  onSubmit,
  onSuccess,
}: {
  onSubmit: (emailData: NewEmail) => Promise<void>;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [emailData, setEmailData] = useState<NewEmail>({
    From: "john@test.com",
    To: "",
    TextBody: "",
    Subject: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(emailData);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error) {
      console.log(error);
      setError("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="From"
          className="block text-sm font-medium text-gray-700"
        >
          From:
        </label>
        <input
          id="From"
          name="From"
          type="email"
          value={emailData.From}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="To" className="block text-sm font-medium text-gray-700">
          To:
        </label>
        <input
          id="To"
          name="To"
          type="email"
          value={emailData.To}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="Subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject:
        </label>
        <input
          id="Subject"
          name="Subject"
          type="text"
          value={emailData.Subject}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="TextBody"
          className="block text-sm font-medium text-gray-700"
        >
          Message:
        </label>
        <textarea
          id="TextBody"
          name="TextBody"
          value={emailData.TextBody}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        ></textarea>
      </div>

      <div className="text-right">
        <Button type="submit" loading={loading}>
          Send
        </Button>
      </div>
      {success ? (
        <div className="text-green-500 font-bold">Email Sent!</div>
      ) : null}
      {error ? <div className="text-red-500 font-bold">{error}</div> : null}
    </form>
  );
}

export default ComposeEmail;
