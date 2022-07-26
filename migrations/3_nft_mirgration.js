const Auction = artifacts.require("Auction");
const NFT = artifacts.require("NFT");

module.exports = async function (deployer) {
  await Auction.deployed()
  await deployer.deploy(NFT, Auction.address);
};