import { Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { FileSignature } from "../store/useSignatureStore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "usehooks-ts";
import { CONTACT_KEY } from "./Contacts";

interface Props {
  signature: FileSignature;
  contacts: any;
}
export default function SignatureCard(props: Props): JSX.Element {
  const { signature, contacts } = props;

  if (!signature || signature?.fileName === "") {
    console.log("invalid signature: ", signature);
    return <></>;
  }

  const contact: any = contacts.find((c) => c.publicKey === signature.signer);

  return (
    <Box sx={{ maxWidth: 1500, minWidth: 500, margin: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 18 }} color="body2">
              Document Name:
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {signature.fileName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 18 }} color="body2">
              Document Hash (SHA-256):
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {signature.fileHash}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 18 }} color="body2">
              Document Size (Bytes):
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {signature.fileSizeBytes}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 18 }} color="body2">
              Document Signer:
            </Typography>
            <Typography sx={{ fontSize: 18, display: "flex" }} variant="body2">
              {signature.signer}
              {contact?.publicKey && (
                <>
                  <Typography
                    sx={{ fontSize: 18, color: "blue", marginLeft: "10px" }}
                    variant="body2"
                  >
                    ({contact.contactName})
                  </Typography>
                </>
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 18 }} color="body2">
              Document Signature Date:
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {new Date(signature.date).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">View in Explorer</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
// https://testnet.nearblocks.io/txns/HGzHKSPjafACpy9JaYq3FMjLzDJMEPGhvk4KhQgooYHf
