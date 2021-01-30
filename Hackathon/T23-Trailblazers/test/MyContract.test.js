const MyContract = artifacts.require('./MyContract.sol');

var chai = require('chai');
const BN = web3.utils.BN;
const chainBN = require('chai-bn')(BN);

chai.use(chainBN);

var chaiAsPromise = require('chai-as-promised');
chai.use(chaiAsPromise);

const expect = chai.expect;
contract('MyContract', async (accounts) => {
  it('Setting and verifying Details', async () => {
    const MyContractInstance = await MyContract.deployed();

    let hash = '9834rb389rb29';
    let timeStamp = new BN(123456);
    let uploader = 'dhairya';

    await MyContractInstance.sethashDetails(uploader, timeStamp, hash);

    const res = await MyContractInstance.verifyDetails(hash);
    // console.log(res);

    expect(res.timestamp).to.be.a.bignumber.equal(timeStamp);
    expect(res.uploader_name).to.be.equal(uploader);
    return expect(res.imgHash).to.be.equal(hash);
  });
});
