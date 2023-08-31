"use client";
import { useState, useEffect, useCallback } from "react";

import { getEmails } from "@/services/email";
import { Email } from "@/types/email";
import EmailTable from "@/components/EmailTable/EmailTable";
import Spinner from "@/components/Generics/Spinner";
import Sent from "@/icons/Sent";
import InboxIcon from "@/icons/Inbox";
import Refresh from "@/icons/Refresh";

import AbsoluteBubble from "../Generics/AbsoluteBubble";

const Inbox = ({
  token = "",
  goToEmail,
  goToCompose,
}: {
  token: string;
  goToEmail: (_id: string) => void;
  goToCompose: () => void;
}) => {
  const [emails, setEmails] = useState<Email[] | null>(null);
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");

  const handleGetEmails = useCallback(async () => {
    setEmails(null);
    const res = await getEmails(activeTab, token);
    setEmails(res);
  }, [token, activeTab]);

  useEffect(() => {
    handleGetEmails();
  }, [activeTab, handleGetEmails]);

  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-start border-r-2 border-purple-500 -my-8 py-4 pr-8">
          <div
            className={`cursor-pointer flex flex-row my-2 -ml-8 pl-8 pr-8 rounded-r-lg py-1 hover:bg-purple-200 ${
              activeTab === "received" ? "bg-purple-100" : ""
            }`}
            onClick={() => setActiveTab("received")}
          >
            <div className="text-xs mr-2 mt-1.5 text-purple-400">
              <InboxIcon />
            </div>
            Inbox
          </div>
          <div
            className={`cursor-pointer flex flex-row items-center my-2 -ml-8 pl-8 pr-8 hover:bg-purple-200 rounded-r-lg py-1 ${
              activeTab === "sent" ? "bg-purple-100" : ""
            }`}
            onClick={() => setActiveTab("sent")}
          >
            <div className="text-xs mr-2 mt text-purple-400">
              <Sent />
            </div>
            Sent
          </div>
        </div>
        <div className="w-full flex items-center justify-center -mr-8 -my-8 ">
          {emails === null ? (
            <div className="w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="h-full w-full">
              <EmailTable goToEmail={goToEmail} emails={emails} />
            </div>
          )}
        </div>
      </div>
      <AbsoluteBubble onClick={goToCompose} icon={<InboxIcon />} />
      <AbsoluteBubble right={75} onClick={handleGetEmails} icon={<Refresh />} />
    </>
  );
};

export default Inbox;
