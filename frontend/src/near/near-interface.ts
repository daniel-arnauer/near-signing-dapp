/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from "near-api-js";
import { Signature } from "near-api-js/lib/transaction";

export class GuestBook {
  contractId: any;
  wallet: any;
  constructor({ contractId, walletToUse }: any) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getMessages() {
    const messages = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_messages",
      // get first 1000 messages
      args: { from_index: 0, limit: 1000 },
    });

    const signatures = messages
      .map((message) => {
        try {
          const signature = JSON.parse(message.text);
          if (signature?.fileName && signature?.fileHash) {
            return signature;
          }
        } catch (error) {
          console.log(error);
        }
      })
      .filter(Boolean)
      .reverse();

    return signatures;
  }

  async getMessagesByDocumentHash(documentHash: string) {
    const messages = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_messages",
      args: { from_index: 0, limit: 1000 },
    });
    const filtered = messages.filter((m) => m.text.includes(documentHash));
    console.log(messages);
    console.log(documentHash);
    console.log(filtered);
    return filtered;
  }

  async addMessage(message: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "add_message",
      args: { text: message },
      deposit: 0,
    });
  }
}
