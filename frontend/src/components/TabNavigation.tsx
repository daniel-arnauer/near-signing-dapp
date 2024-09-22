import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Overview from "../pages/Overview";
import CheckSignature from "../pages/CheckSignature";
import Contacts, { CONTACT_KEY } from "./Contacts";
import { useLocalStorage } from "usehooks-ts";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Login from "./Login";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabNavigation({ isSignedIn, guestBook, wallet }: any) {
  const [value, setValue] = React.useState(0);

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

  const [contacts, setContacts] = useLocalStorage(CONTACT_KEY, defaultContacts);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!isSignedIn) {
    return <Login wallet={wallet} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="tab navigation">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Check Signature" {...a11yProps(1)} />
          <Tab label="Contacts" {...a11yProps(2)} />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Button
            variant="text"
            onClick={() =>
              (window as any)
                .open(
                  "https://testnet.nearblocks.io/address/dev-1704319728796-81973520180924",
                  "_blank"
                )
                .focus()
            }
          >
            Explore this smart contract &nbsp;{" "}
            <OpenInNewIcon fontSize="small" />
          </Button>
          <Button variant="contained" onClick={() => wallet.signOut()}>
            Logout
          </Button>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Overview wallet={wallet} guestBook={guestBook} contacts={contacts} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CheckSignature wallet={wallet} guestBook={guestBook} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Contacts
          wallet={wallet}
          contacts={contacts}
          setContacts={setContacts}
        />
      </CustomTabPanel>
    </Box>
  );
}
