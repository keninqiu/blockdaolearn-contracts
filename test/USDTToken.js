const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  const totalSupply = 1_000_000_000;
  describe("USDTToken", function () {
    async function deployUSDTTokenFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const USDTToken = await ethers.getContractFactory("USDTToken");
      const usdtToken = await USDTToken.deploy(totalSupply);
  
      return { usdtToken, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the right unlockTime", async function () {
        const { usdtToken, owner } = await loadFixture(deployUSDTTokenFixture);
        const ownerBalance = await usdtToken.balanceOf(owner.address);
        expect(await usdtToken.totalSupply()).to.equal(ownerBalance);
      });
  
    });
  
  });
  