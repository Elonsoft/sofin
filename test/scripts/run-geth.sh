#!/bin/sh

SCRIPTDIR="$(dirname "$0")"

rm -rf "$SCRIPTDIR/.blockchain"
tar -xzf "$SCRIPTDIR/blockchain.tar.gz" -C "$SCRIPTDIR"

nice -n 5 geth --dev \
  --datadir "$SCRIPTDIR/.blockchain" \
  --rpc --rpcapi="db,eth,net,web3,personal" \
  --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "localhost" \
  --unlock "0,1,2,3,4,5,6,7,8" \
  --password "$SCRIPTDIR/geth-passwords.txt" \
  --mine \
  console
