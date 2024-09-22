import "./App.css";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import TabNavigation from "./components/TabNavigation";
import { Wallet } from "./near/near-wallet";
import { GuestBook } from "./near/near-interface";
import React from "react";

// The smart contract to use. See in contract/neardev/dev-account.env
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const guestBook = new GuestBook({
  contractId: process.env.CONTRACT_NAME,
  walletToUse: wallet,
});

function App() {
  const [isSignedIn, setisSignedIn] = React.useState(false);
  React.useLayoutEffect(() => {
    const mount = async () => {
      const isSignedInOnMount = await wallet.startUp();
      setisSignedIn(isSignedInOnMount);
      console.log(isSignedInOnMount);
    };
    void mount();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <TabNavigation
            isSignedIn={isSignedIn}
            guestBook={guestBook}
            wallet={wallet}
          />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
