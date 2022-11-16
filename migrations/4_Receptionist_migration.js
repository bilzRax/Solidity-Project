const Receptionist = artifacts.require("Receptionist");


module.exports = function (deployer) {
  deployer.deploy(Receptionist);
};
