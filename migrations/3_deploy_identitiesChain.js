var IdentitiesChain = artifacts.require("./IdentitiesChain.sol");
module.exports = function(deployer) {
  deployer.deploy(IdentitiesChain);
};
