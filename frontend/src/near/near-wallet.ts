/* A helper file that simplifies using the wallet selector */

// near api js
import { providers } from "near-api-js";

// wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";
import LedgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";

// wallet selector options
import {
  Network,
  NetworkId,
  WalletSelector,
  setupWalletSelector,
} from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector: WalletSelector | undefined;
  wallet: any;
  network: NetworkId | Network;
  createAccessKeyFor: string | undefined;
  accountId?: string | undefined | null;
  publicKey?: string | undefined | null;

  constructor({ createAccessKeyFor = undefined, network = "testnet" }: any) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network as NetworkId;
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupMyNearWallet({ iconUrl: MyNearIconUrl }),
        setupLedger({ iconUrl: LedgerIconUrl }),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();
    console.log(isSignedIn);
    console.log(this.walletSelector.store.getState());
    console.log(this.walletSelector.store.getState().selectedWalletId);
    console.log(this.wallet);
    console.log(await this.wallet?.getAccounts?.());

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
      this.publicKey = (await this.wallet?.getAccounts?.())?.find(
        (a) => a.accountId === this.accountId
      ).publicKey;
    }

    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector as any, {
      contractId: this.createAccessKeyFor as any,
      description,
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    console.log("sign out");
    this.wallet?.signOut();
    this.wallet =
      this.accountId =
      this.createAccessKeyFor =
      this.publicKey =
        undefined;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }: any) {
    const { network } = this?.walletSelector?.options ?? { network: "testnet" };
    const provider = new providers.JsonRpcProvider({
      url: (network as any).nodeUrl,
    });
    console.log(contractId);
    const res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
    return JSON.parse(Buffer.from((res as any).result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: any) {
    // Sign a transaction with the "FunctionCall" action
    const outcome = await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
    console.log(outcome);

    return providers.getTransactionLastResult(outcome);
  }

  // Get transaction result from the network
  async getTransactionResult(txhash: string | Uint8Array) {
    const { network } = this.walletSelector?.options as any;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }
}
