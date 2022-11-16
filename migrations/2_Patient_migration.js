const Patient = artifacts.require("_Patient");

module.exports = function (deployer) {
  deployer.deploy(Patient);
};

