import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FileSignature } from "../store/useSignatureStore";
import SignatureCard from "../components/SignatureCard";
import { SignatureStepper } from "../components/SignatureStepper";
import { FileSigningComponent } from "../components/FileSigningComponent";

export default function Overview({ wallet, guestBook, contacts }: any) {
  const currentAccountId = wallet.accountId;
  const [messages, setMessages] = useState<FileSignature[]>([]);

  useEffect(() => {
    // Load on mount
    guestBook.getMessages().then(setMessages);
  }, []);

  return (
    <>
      <SignatureStepper
        wallet={wallet}
        guestBook={guestBook}
        updateMessages={setMessages}
      />

      <h2>Messages</h2>
      {messages.map((message, i) => (
        <SignatureCard signature={message} contacts={contacts} />
      ))}
    </>
  );
}
