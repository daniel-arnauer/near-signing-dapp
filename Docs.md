### Storage costs

https://docs.near.org/concepts/storage/storage-staking

1 Near for 100kB

Every user should pay a little fee to upload a signature. Calculate the byte size of the message and set the fee amount accordingly.

### Create signature on Blockchain

1. Upload document of any type
2. Upload JSON object with hash, filename, public key of signer and date to smart contract
3. Show the user the Transaction ID and add a card to "My Signatures"

### Check signature on blockchain

1. Upload document of any type
2. The hash will be calculated.
3. All Signaure messages on the smart contract will be searched for the hash
4. If found, print out the public key of signer, data, hash, filename, transaction id
5. If not, say no signature found for that file

### Add contacts to dApp

For better UX, the user can associate public keys with real world names in the dApp. If the user then checks a signature
of a document, he will see the public key together with the associated name, if existing.

## Example

Added a message to near smart contract: https://testnet.nearblocks.io/txns/9qqscBWXYhhJKbrHSaZMVEz5zDcXGPtqYrDnb7jQTdFi#execution

See all transaction in the smart contract: https://testnet.nearblocks.io/address/dev-1704319728796-81973520180924

## Feedback Göschka

- Kriterienkatallog anhand bestehender Literatur machen
- Diesen Kriterienkatallog für die Protection Motivation Theory und Technology Acceptance Model verwenden. Das erzeugt Objektivität
- Diesen auch im Interview hernehmen und besprechen

- UX: Transaktionen brauchen gewisse Zeit. Zeige den User Status der Transaktion an: Pending, Failed, Finished
