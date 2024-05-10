# p2p-ssv-cluster-manager

## HTTP service

Start the server
```shell
pnpm start
```

##### Transfer SSV tokens from factory to clusters
`GET http://localhost:3000/01-transfer-ssv-tokens-from-factory-to-clusters`

##### Remove exited validators from clusters
`GET http://localhost:3000/02-remove-exited-validators-from-clusters`

##### Withdraw excess SSV tokens from clusters
`GET http://localhost:3000/03-withdraw-excess-tokens-from-clusters`

## Local usage

##### Transfer SSV tokens from factory to clusters
`pnpm run 01-transfer-ssv-tokens-from-factory-to-clusters`

##### Remove exited validators from clusters
`pnpm run 02-remove-exited-validators-from-clusters`

##### Withdraw excess SSV tokens from clusters
`pnpm run 03-withdraw-excess-tokens-from-clusters`

## Important

All HTTP requests return instantly. But the actual processes take long time to complete.

Please look into the logs to track the actual execution. 

Transactions are executed via Gnosis Safe (`0xbc1Ff75c84724Fe6377e0FDD13cd0f59C156e864`), which is the owner of `P2pSsvProxyFactory`.
This Gnosis Safe is a multisig with a threshold of 2.

One of the signers private key must be provided as an ENV variable `PRIVATE_KEY`.

The other one must be used externally.

When you see in the logs text like:

```
Now please send "approveHash" tx with hashToApprove = HASH_TO_APPROVE to 0xbc1Ff75c84724Fe6377e0FDD13cd0f59C156e864 from SAFE_OWNER_ADDRESS
```

do what it asks you for. 

You can do it, for example, by using Etherscan

1. Go to https://etherscan.io/address/0xbc1Ff75c84724Fe6377e0FDD13cd0f59C156e864#writeProxyContract
2. Click "Connect to Web3"
3. Choose your wallet (e.g. Metamask)
4. Make sure it says "Connected" instead of "Connect to Web3"
5. Open 2. approveHash (0xd4d9bdcd) from the list of functions.
6. Copy the `HASH_TO_APPROVE` from the logs into the *hashToApprove (bytes32)* field
7. Click "Write" under the *hashToApprove (bytes32)* field
8. Confirm the transaction in your wallet (e.g. Metamask)

The script will be listening to your `approveHash` transaction. 
Once it's confirmed on the blockchain, the script will execute its transactions from Gnosis Safe.


