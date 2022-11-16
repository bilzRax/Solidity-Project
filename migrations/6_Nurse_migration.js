const Nurse = artifacts.require("Nurse");


module.exports = function (deployer) {
  deployer.deploy(Nurse);
};
