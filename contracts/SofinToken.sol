pragma solidity 0.4.18;

import './zeppelin/token/BurnableToken.sol';


contract SofinToken is BurnableToken {
  string public constant NAME = 'SOFIN ICO';
  string public constant SYMBOL = 'SOFIN';
  uint256 public constant DECIMALS = 18;

  uint256 public constant TOKEN_CREATION_CAP =  10700000 * 10 ** DECIMALS;

  address public multiSigWallet;
  address public owner;

  bool public active = true;

  // token price: 0.45 USD per token, eth price = 298 USD
  uint256 public oneTokenInWei = 1510067114093959;

  modifier onlyOwner {
    if (owner != msg.sender) {
      revert();
    }
    _;
  }

  modifier onlyActive {
    if (!active) {
      revert();
    }
    _;
  }

  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  /**
   * event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param amount amount of tokens purchased
   */
  event TokenPurchase(
    address indexed purchaser,
    address indexed beneficiary,
    uint256 value,
    uint256 amount
  );

  function SofinToken(address _multiSigWallet) public {
    multiSigWallet = _multiSigWallet;
    owner = msg.sender;
  }

  function() payable public {
    createTokens();
  }

  /**
   * @param  _to Target address.
   * @param  _amount Amount of SOFIN tokens, _NOT_ multiplied to decimals.
   */
  function mintTokens(address _to, uint256 _amount) external onlyOwner {
    uint256 decimalsMultipliedAmount = _amount.mul(10 ** decimals);
    uint256 checkedSupply = totalSupply.add(decimalsMultipliedAmount);
    if (tokenCreationCap < checkedSupply) {
      revert();
    }

    balances[_to] += decimalsMultipliedAmount;
    totalSupply = checkedSupply;

    Mint(_to, decimalsMultipliedAmount);
    Transfer(address(0), _to, decimalsMultipliedAmount);
  }

  function withdraw() external onlyOwner {
    multiSigWallet.transfer(this.balance);
  }

  function finalize() external onlyOwner {
    active = false;

    MintFinished();
  }

  /**
   * Sets price in wei per 1 SOFIN token.
   */
  function setTokenPriceInWei(uint256 _oneTokenInWei) external onlyOwner {
    oneTokenInWei = _oneTokenInWei;
  }

  function createTokens() internal onlyActive {
    if (msg.value <= 0) {
      revert();
    }

    uint256 multiplier = 10 ** decimals;
    uint256 tokens = msg.value.mul(multiplier) / oneTokenInWei;

    uint256 checkedSupply = totalSupply.add(tokens);
    if (tokenCreationCap < checkedSupply) {
      revert();
    }

    balances[msg.sender] += tokens;
    totalSupply = checkedSupply;

    Mint(msg.sender, tokens);
    Transfer(address(0), msg.sender, tokens);
    TokenPurchase(
      msg.sender,
      msg.sender,
      msg.value,
      tokens
    );
  }
}
