import { MetaMaskSDK } from '@metamask/sdk';
import { AnoteAbi } from './anoteabi';
import { ethers, parseEther } from 'ethers';
import $ from 'jquery';

const contractAddress = '0xae60E1a4eF26671807411368Cc150631eF1456Fd';

const start = async () => {
  if (window.ethereum !== undefined) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    });
    
    let signer = null;
    let provider;

    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, AnoteAbi, signer);
    contract.connect(provider);

    // var tx = await contract.deposit("fdsafsdafdsa", 100000000);

    // await tx.wait()

    // const options = {value: parseEther("0.001")};

    // var tx = await contract.withdraw(options);
    // await tx.wait();

    if (accounts != null) {
      var we = await contract.withdrawExists(accounts[0]);
      if (we) {
        $("#wbtn").removeClass("btn-secondary");
        $("#wbtn").addClass("btn-success");
      } else {
        $("#nowe").fadeIn();
      }
    }
  }
};

if (window.ethereum == null || window.ethereum == undefined) {
  $("#loading").fadeOut(function() {
    $("#error").fadeIn();
  });
} else {
  $("#loading").fadeOut(function() {
    $("#success").fadeIn();
    start();
  });
}
