import './App.css';
const ethers = require('ethers');
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');

const abi = require("./utils/Inflection.json").abi;
const InflectionAddress = '0x3037FAdD92361B09818056AA88E64f7Df1A8a6EF';

function App() {

  async function connectWallet() {
    
    try {

        const { ethereum } = window

        if (!ethereum) {
          alert("Get MetaMask!")
          return
        } 

        const signer = new ethers.providers.Web3Provider(ethereum, 'any').getSigner()
        const Inflection = new ethers.Contract(InflectionAddress, abi, signer)
        const Address = (await ethereum.request({ method: "eth_requestAccounts" }))[0]
        if (id) {
          await Inflection.authenticate(id, Address)
          alert("Authenticated!")
        }
    
    } catch (error) {
        console.log(error)
    }
      
}

  
  return (
    <div className="App">

      <h3>Inflection OAuth</h3>
      <button onClick= {connectWallet} id='button'>Authenticate</button>
      <p id="output1"></p>

    </div>
  );
}

export default App;
