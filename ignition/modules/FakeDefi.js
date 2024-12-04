// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FakeDefiModule", (m) => {

  const token = m.contract("FakeDefi", ['0x24CA731e6AAb4368503a6B63EF3C3Ab2013971fb']);

  return { token };
});
