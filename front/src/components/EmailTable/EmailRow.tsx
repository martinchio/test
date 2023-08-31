import { Email } from "@/types/email";
import { dateFormatter } from "@/utils/dateFormatter";

const EmailRow = ({
  email,
  goToEmail,
}: {
  email: Email;
  goToEmail: (_id: string) => void;
}) => {
  return (
    <div
      className="flex flex-row border-b border-purple-500 w-full px-4 first:rounded-tr-lg  py-1 hover:border-b-2 hover:shadow-sm hover:bg-purple-50 hover:cursor-pointer"
      onClick={() => goToEmail(email._id)}
    >
      <div className="flex justify-between w-full">
        <div className="flex">
          <p className="mr-4 md:pr-4">
            {email.Type === "sent" ? `To: ${email.To}` : email.From}
          </p>
          <p className="mr-2">{email.Subject} - </p>
          <p className="font-light hidden md:block">
            {email.Body.substring(0, 50) + " [...]"}
          </p>
        </div>
        <div>
          <p>{dateFormatter(email.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailRow;
