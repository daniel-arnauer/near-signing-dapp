import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useSignatureStore } from "../store/useSignatureStore";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

const calculateHash = async (buffer) => {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

export const FileSigningComponent = ({
  wallet,
  guestBook,
  updateMessages,
  showSubmitButton,
  onSubmit,
}: any) => {
  const signatureStore = useSignatureStore();
  const currentAccountId = wallet.accountId;
  console.log(wallet);
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = async (e) => {
        const fileBuffer = e?.target?.result;
        const calculatedHash = await calculateHash(fileBuffer);
        signatureStore.set({
          fileName: selectedFile.name,
          fileHash: calculatedHash,
          fileSizeBytes: selectedFile.size,
          signer: wallet.publicKey ?? "error",
          date: new Date().getTime(),
        });
      };
    }
  };

  const submitSignature = async (e: any) => {
    e.preventDefault();

    const signatureStringified = JSON.stringify(signatureStore.fileSignature);
    await guestBook.addMessage(signatureStringified);
    const messages = await guestBook.getMessages();

    updateMessages(messages);
    signatureStore.destroy();
    onSubmit?.();
  };

  return (
    <Box sx={{}}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" onChange={handleFileChange} hidden />
      </Button>
      {/* {JSON.stringify(signatureStore.fileSignature)} */}

      {signatureStore?.fileSignature?.fileName && (
        <NewSignature
          fileName={signatureStore.fileSignature.fileName}
          fileHash={signatureStore.fileSignature.fileHash}
          fileSizeBytes={signatureStore.fileSignature.fileSizeBytes}
          signer={currentAccountId}
          deleteSignature={() => signatureStore.destroy()}
        />
      )}

      {signatureStore.fileSignature.fileHash !== "" &&
        showSubmitButton === true && (
          <Button
            variant="contained"
            component="label"
            disabled={signatureStore.fileSignature.fileHash === ""}
            onClick={submitSignature}
          >
            Sign document on Blockchain
          </Button>
        )}
    </Box>
  );
};

const NewSignature = ({
  fileName,
  fileHash,
  fileSizeBytes,
  signer,
  deleteSignature,
}: any) => {
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
              {fileName}
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
              {fileHash}
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
              {fileSizeBytes}
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
              {signer}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{ color: "red" }}
            onClick={() => deleteSignature()}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
