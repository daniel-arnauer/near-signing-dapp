import { Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";

export default function CheckSignature({ wallet, guestBook }: any) {
  const currentAccountId = wallet.accountId;
  const currentPublicKeyOfAccount = wallet.publicKey;
  const [documentHash, setDocumentHash] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const searchForContract = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const foundMessages = await guestBook.getMessagesByDocumentHash(
      documentHash
    );
    console.log(foundMessages);
    setMessages([...foundMessages]);
  };

  return (
    <>
      <Box>
        <TextField
          id="documentHash-input-field"
          label="Document Hash"
          variant="outlined"
          onChange={(e) => setDocumentHash(e.target.value)}
        />
        <Button variant="contained" onClick={(e) => searchForContract(e)}>
          Search
        </Button>
      </Box>

      <MessageList messages={messages} />
    </>
  );
}

function MessageList(messages: any) {
  const [foundMessages, setFoundMessages] = useState<any>([]);

  useEffect(() => {
    if (messages?.messages) {
      setFoundMessages(messages.messages);
    }
  }, [JSON.stringify(messages)]);

  if (!foundMessages || foundMessages?.length === 0) {
    console.log("null");
    return null;
  }

  return (
    <>
      {foundMessages?.map((message, i) => {
        return (
          <p key={i}>
            <strong>{message?.sender}</strong>:<br />
            {message?.text}
          </p>
        );
      })}
    </>
  );
}
