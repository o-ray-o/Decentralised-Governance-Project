const { ethers } = require("hardhat");

// Governor deployed to 0x7BEFca5Ee98801925CdDd76996dde09ae978fd18
// Token deployed to 0x6be81f3B64E45b3aCD9b6dFCCEEBBd8666156D35

const tokenAddr = "0x6be81f3B64E45b3aCD9b6dFCCEEBBd8666156D35";
const tokenContractName = "MyToken";

async function main() {
  const token = await hre.ethers.getContractAt(tokenContractName, tokenAddr);
  const [owner] = await ethers.getSigners();

  const tx = await token.delegate(owner.address);
  const receipt = await tx.wait();

  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
