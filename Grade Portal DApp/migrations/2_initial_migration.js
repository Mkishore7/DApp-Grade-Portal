var GradePortal = artifacts.require("./GradePortal.sol");

module.exports = function(deployer) {
  deployer.deploy(GradePortal);
};
