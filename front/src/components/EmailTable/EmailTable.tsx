import React from "react";
import { Email } from "@/types/email";
import EmailRow from "./EmailRow";

const EmailTable = ({ emails }: { emails: Email[] }) => {
  return (
    <>
      {emails.map((email) => (
        <EmailRow email={email} key={email._id} />
      ))}
    </>
  );
};

export default EmailTable;
