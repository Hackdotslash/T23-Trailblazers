var MyContract = artifacts.require("./MyContract.sol");

module.exports = async function (deployer) {
  await deployer.deploy(MyContract);
  const MyContractInstance = await MyContract.deployed();

  // let hash = "Qmd9Jhi4q5hxD3wonKi3FYUQkVYx6GcnUDVUn3tPxNhesE";

  // await MyContractInstance.set(hash);
};
