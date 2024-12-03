require("@nomicfoundation/hardhat-toolbox");
const data = require('./config/secret.json');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${data.INFURA_API_KEY}`,
      accounts: [data.SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: data.ETHERSCAN_API_KEY,
    },
  },
};
