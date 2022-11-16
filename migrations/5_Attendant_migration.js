const Attendant = artifacts.require("_Attendant");


module.exports = function (deployer) {
  deployer.deploy(Attendant);
};
