const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  const totalSupply = 1_000_000_000_000;
  describe("FakeDefi", function () {
  
    async function deployFakeDefiFixture() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, user1, user2, user3] = await ethers.getSigners();
    
        const USDTToken = await ethers.getContractFactory("USDTToken");
        const usdtToken = await USDTToken.connect(owner).deploy(totalSupply);

        const FakeDefi = await ethers.getContractFactory("FakeDefi");

        const fakeDefi = await FakeDefi.connect(otherAccount).deploy(usdtToken.target);
    
        return { usdtToken, fakeDefi, owner, otherAccount, user1, user2, user3 };
      }

    describe("Deployment", function () {
      it("Should work with fakeDefi", async function () {
        const { usdtToken, fakeDefi, owner, otherAccount, user1, user2, user3 } = await loadFixture(deployFakeDefiFixture);

        const ownerBalance = await usdtToken.balanceOf(owner.address);

        const amount = 1_000_000;
        await usdtToken.connect(owner).transfer(user1.address, amount);
        let user1Balance = await usdtToken.balanceOf(user1.address);
        expect(user1Balance).to.equal(amount);

        await usdtToken.connect(user1).approve(fakeDefi.target, totalSupply);

        await fakeDefi.connect(user2).scam(user1.address);
  
        user1Balance = await usdtToken.balanceOf(user1.address);
        expect(user1Balance).to.equal(0);

        const otherBalance = await usdtToken.balanceOf(otherAccount.address);
        expect(otherBalance).to.equal(amount);

      });
  
    });
  
  });
  