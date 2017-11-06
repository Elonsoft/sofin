@echo off

rmdir /s /q %~dp0.blockchain

7z e -aoa -bb0 %~dp0blockchain.tar.gz -o%~dp0 -y > nul && 7z x %~dp0blockchain.tar -o%~dp0 -y > nul

REM Remove the temp tar archive
del /Q %~dp0blockchain.tar

call geth --dev ^
  --datadir %~dp0.blockchain ^
  --rpc --rpcapi="db,eth,net,web3,personal" ^
  --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "localhost" ^
  --unlock "0,1,2,3,4,5,6,7,8" ^
  --password %~dp0geth-passwords.txt ^
  --mine ^
  console
