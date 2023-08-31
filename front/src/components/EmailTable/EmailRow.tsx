import { Email } from '@/types/email'
import { dateFormatter } from '@/utils/dateFormatter';

const EmailRow = ({email}: {email: Email}) => {

  return (
    // <div className="grid grid-cols-5 gap-4 p-4 border-b">
    //   <span>{email.From}</span>
    //   <span>{email.To}</span>
    //   <span>{email.Subject}</span>
    //   <span>{new Date(email.createdAt).toLocaleString()}</span>
    // </div>

    <div className='flex flex-row border-t border-b border-purple-500 w-full px-4 first:border-t-0 py-1 hover:border-b-2 hover:shadow-sm hover:bg-purple-50 hover:cursor-pointer'>
      <div className='flex justify-between w-full'>
        <div className='flex'>
          <p className='mr-4 md:pr-4'>{email.Type === "sent" ? `To: ${email.To}` : email.From}</p>
          <p className='mr-2'>{email.Subject} - </p>
          <p className='font-light hidden md:block'>{email.Body.substring(0, 50) + "[...]"}</p>
        </div>
        <div>
          <p>{dateFormatter(email.createdAt)}</p>
        </div>
      </div>
    </div>
  );

}



export default EmailRow