const Pharmacy = artifacts.require("Pharmacy");


module.exports = function (deployer) {
  deployer.deploy(Pharmacy);
};
