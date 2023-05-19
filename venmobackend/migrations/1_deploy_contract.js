const Venmo = artifacts.require("VenmoTrans.sol");

module.exports = function(deployer) {
 deployer.deploy(Venmo);
};