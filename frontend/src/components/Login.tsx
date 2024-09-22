import { Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
export default function Login({ wallet }): JSX.Element {
  return (
    <Box sx={{ maxWidth: 1500, minWidth: 500, margin: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <h2>Welcome to the Near Document signing App!</h2>
            <Typography sx={{ fontSize: 18 }} color="body2">
              This dApp uses the Near protocol Tesnet. Press "Connect Near
              Wallet" to connect an existing wallet or to create new one.
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={() => wallet.signIn()}>
            Connect Near Wallet
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
// https://testnet.nearblocks.io/txns/HGzHKSPjafACpy9JaYq3FMjLzDJMEPGhvk4KhQgooYHf
