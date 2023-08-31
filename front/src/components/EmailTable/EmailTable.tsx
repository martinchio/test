import { Email } from "@/types/email";
import EmailRow from "./EmailRow";

const EmailTable = ({
  emails,
  goToEmail,
}: {
  emails: Email[];
  goToEmail: (_id: string) => void;
}) => {
  return (
    <>
      {emails.map((email) => (
        <EmailRow goToEmail={goToEmail} email={email} key={email._id} />
      ))}
    </>
  );
};

export default EmailTable;
