#!/usr/bin/env bash
# Simple script that flattens all smart contracts up for deployment

# Output directory
output=./build/flatten

echo Flattening ../contracts/SofinToken.sol to $output
yarn truffle-flattener ../contracts/SofinToken.sol $output
