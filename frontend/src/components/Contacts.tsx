import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "usehooks-ts";

export const CONTACT_KEY = "near_signing_app_saved_contacts";

interface Props {
  wallet: any;
  contacts: any;
  setContacts: any;
}

export default function Contacts(props: Props): JSX.Element {
  const { wallet, contacts, setContacts } = props;
  const currentAccountId = React.useMemo(
    () => wallet.accountId,
    [wallet.accountId]
  );
  const currentPublicKeyOfAccount = React.useMemo(
    () => wallet.publicKey,
    [wallet.publicKey]
  );

  const defaultContacts = [
    {
      id: 0,
      contactName: "Your wallet",
      myNearWalletAcountId: currentAccountId,
      publicKey: currentPublicKeyOfAccount,
    },
  ];

  //   const [contacts, setContacts] = useLocalStorage(CONTACT_KEY, defaultContacts);
  const [isModalOpen, setisModalOpen] = useState(false);

  return (
    <>
      <AddContactModal
        open={isModalOpen}
        setOpen={setisModalOpen}
        contacts={contacts}
        setContacts={setContacts}
      />
      <Button onClick={() => setisModalOpen(!isModalOpen)} variant="outlined">
        Add Contact
      </Button>
      {contacts.map((contact) => {
        return (
          <ContactCard
            contact={contact}
            contacts={contacts}
            setContacts={setContacts}
          />
        );
      })}
    </>
  );
}

const ContactCard = ({ contact, contacts, setContacts }) => {
  function deleteContactById(id: number): void {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    console.log(contacts);
    console.log(id);
    console.log(newContacts);
    setContacts(newContacts);
  }

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
              Contact Name:
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {contact.contactName}
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
              MyNearWallet Account Name:
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {contact.myNearWalletAcountId ?? "not existing"}
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
              Public key (near protocol blockchain, derived from wallet):
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2">
              {contact.publicKey ?? ""}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          {contact.id !== 0 && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => deleteContactById(contact.id)}
            >
              Delete Contact
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

const AddContactModal = ({ open, setOpen, contacts, setContacts }) => {
  const [newContact, setNewContact] = useState({
    id: uniqueId(),
    contactName: "",
    myNearWalletAcountId: "",
    publicKey: "",
  });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a name together with a public key. The name will be shown in
          signatures together with the public key.
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setNewContact({
              ...newContact,
              contactName: e.target.value,
              id: uniqueId(),
            })
          }
        />
        <TextField
          margin="dense"
          id="public_key"
          label="Public Key"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setNewContact({
              ...newContact,
              publicKey: e.target.value,
              id: uniqueId(),
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} sx={{ color: "red" }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log(newContact);
            setContacts([...contacts, newContact]);
            setOpen(false);
          }}
          disabled={
            newContact.contactName === "" || newContact.publicKey === ""
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
