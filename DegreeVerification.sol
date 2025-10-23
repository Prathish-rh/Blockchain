// npm install web3
const Web3 = require('web3');
const web3 = new Web3(window.ethereum); // or new Web3("https://sepolia.infura.io/v3/YOUR_KEY");

const contractAddress = "0x...";
const abi = [ /* ABI array here */ ];
const contract = new web3.eth.Contract(abi, contractAddress);

// Example: issueDegree via MetaMask (owner)
async function issueDegree() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const owner = accounts[0];

  const receipt = await contract.methods.issueDegree(
      "0xStudentAddressHere",
      "Alice Example",
      "B.Tech Computer Science",
      "Example University",
      2025,
      "Qm...ipfsCID"
    )
    .send({ from: owner, gas: 300000 });

  console.log("Tx:", receipt.transactionHash);
}

// verify
async function verify(degreeId, studentAddr) {
  const valid = await contract.methods.verifyDegree(degreeId, studentAddr).call();
  console.log(valid);
}

// get details
async function getDetails(degreeId) {
  const d = await contract.methods.getDegreeDetails(degreeId).call();
  console.log(d);
}
