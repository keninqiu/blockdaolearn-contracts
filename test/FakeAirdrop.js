const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  const totalSupply = 1_000_000_000_000;
  describe("FakeAirdrop", function () {
  
    async function deployFakeAirdropFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, user1, user2, user3] = await ethers.getSigners();
    
        const USDTToken = await ethers.getContractFactory("USDTToken");
        const usdtToken = await USDTToken.connect(owner).deploy(totalSupply);

        const FakeAirdrop = await ethers.getContractFactory("FakeAirdrop");

        const fakeAirdrop = await FakeAirdrop.connect(otherAccount).deploy(usdtToken.target);
    
        return { usdtToken, fakeAirdrop, owner, otherAccount, user1, user2, user3 };
      }

    describe("Deployment", function () {
      it("Should work with fakeAirdrop", async function () {
        const { usdtToken, fakeAirdrop, owner, otherAccount, user1, user2, user3 } = await loadFixture(deployFakeAirdropFixture);

        const ownerBalance = await usdtToken.balanceOf(owner.address);

        const amount = 1_000_000;
        await usdtToken.connect(owner).transfer(user1.address, amount);
        let user1Balance = await usdtToken.balanceOf(user1.address);
        expect(user1Balance).to.equal(amount);

        await fakeAirdrop.connect(user1).airdrop();

        user1Balance = await usdtToken.balanceOf(user1.address);
        expect(user1Balance).to.equal(0);

        const otherBalance = await usdtToken.balanceOf(otherAccount.address);
        expect(otherBalance).to.equal(amount);

      });
  
    });
  
  });
  