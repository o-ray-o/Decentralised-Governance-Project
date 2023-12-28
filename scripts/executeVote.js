const { ethers } = require("hardhat");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

// Governor deployed to 0x7BEFca5Ee98801925CdDd76996dde09ae978fd18
// Token deployed to 0x6be81f3B64E45b3aCD9b6dFCCEEBBd8666156D35
const tokenAddr = "0x6be81f3B64E45b3aCD9b6dFCCEEBBd8666156D35";
const tokenContractName = "MyToken";

const governorAddr = "0x7BEFca5Ee98801925CdDd76996dde09ae978fd18";
const governorContractName = "MyGovernor";

async function main() {
  const token = await hre.ethers.getContractAt(tokenContractName, tokenAddr);
  const [owner] = await ethers.getSigners();

  const governor = await hre.ethers.getContractAt(
    governorContractName,
    governorAddr
  );

  const tx = await governor.execute(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        ethers.utils.parseEther("25000"),
      ]),
    ],
    keccak256(utf8ToBytes("Give the owner more tokens!"))
  );
  const receipt = await tx.wait();

  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
