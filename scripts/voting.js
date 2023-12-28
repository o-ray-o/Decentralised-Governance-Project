// Governor deployed to 0x7BEFca5Ee98801925CdDd76996dde09ae978fd18
// Token deployed to 0x6be81f3B64E45b3aCD9b6dFCCEEBBd8666156D35
const proposalId =
  "60655625085350547345448375133398788287266427677826030363074605368902227462966";
const governorAddr = "0x7BEFca5Ee98801925CdDd76996dde09ae978fd18";
const governorContractName = "MyGovernor";

async function main() {
  const governor = await hre.ethers.getContractAt(
    governorContractName,
    governorAddr
  );

  const tx = await governor.castVote(proposalId, 1);
  const receipt = await tx.wait();

  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
