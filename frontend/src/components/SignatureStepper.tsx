import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FileSigningComponent } from "./FileSigningComponent";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

export const SignatureStepper = ({
  wallet,
  guestBook,
  updateMessages,
}: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setisModalOpen] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Sign a document on near blockchain",
      description:
        "This dialog provides the steps to create a new signature of a document and upload it to the near blockchain",
      component: <></>,
    },
    {
      label: "Upload a document",
      description:
        "You can upload any document. The fingerprint of the document (SHA-256 Hash) will be calculated). The document will never be saved on the blockchain (only your signature is uploaded to the blockchain).",
      component: (
        <FileSigningComponent
          wallet={wallet}
          guestBook={guestBook}
          updateMessages={updateMessages}
          showSubmitButton={false}
        />
      ),
    },
    {
      label: "Upload your signature to the near blockchain",
      description:
        "After pressing the button, your signature will be uploaded to the blockchain. The signature contains the fingerprint (hash), the name and the size of the document.",
      component: (
        <FileSigningComponent
          wallet={wallet}
          guestBook={guestBook}
          updateMessages={updateMessages}
          showSubmitButton={true}
          onSubmit={() => handleReset()}
        />
      ),
    },
  ];

  if (!isModalOpen) {
    return (
      <Button variant="contained" onClick={() => setisModalOpen(true)}>
        Create Signature
      </Button>
    );
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setisModalOpen(false)}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1000px",
          },
        },
      }}
    >
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  {step.component}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index !== steps.length - 1 && (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                      )}
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setisModalOpen(false)} sx={{ color: "red" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
