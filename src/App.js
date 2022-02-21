import "./App.css";
import Web3 from "web3";
import { useState ,useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [mainData,setMainData]=useState();
  const stakeAmountInput=useRef();
  const [buttonLoading,setButtonLoading]=useState();
  const [currentRewardsCROUSDC,setCurrentRewardsCROUSDC]=useState("0");
  const [currentRewardsUSDCCROW,setCurrentRewardsUSDCCROW]=useState("0");
  const [currentRewardsCROWCRO,setCurrentRewardsCROWCRO]=useState("0");


    const vaultAbi=[{"inputs":[{"internalType":"address","name":"adres","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"new_rateH","type":"uint256"},{"internalType":"uint256","name":"new_rateL","type":"uint256"}],"name":"changeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"checkUserRewards","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"lpStakingContract","type":"address"}],"name":"claimRewardsws","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"emergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"address","name":"lpStakingContract","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenRewardRateH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenRewardRateL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"address","name":"lpStakingContract","type":"address"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const tokenAbi=[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }];
  const walletConnect = async () => {
    const accounts=await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider=window.ethereum;
    const userWallet=accounts[0];
    const web3 = new Web3(provider);
    
    setMainData({
      userWallet,
      web3
    });
    
  };

 
  const approveHandler=async(tokenContractAddress,contractAddress)=>{
    setButtonLoading(true);
    const _contract = new mainData.web3.eth.Contract(tokenAbi,tokenContractAddress);
    const allowance=await _contract.methods.allowance(mainData.userWallet,contractAddress).call();
    if(!(allowance>0)){
    await _contract.methods.approve(contractAddress,"100000000000000000000000000000000000").send({from:mainData.userWallet})
    }
    setButtonLoading(false);

    
  }


  
 
  const stakeHandler = async (contract,tokenPair,pid) => {
   
    if(mainData?.userWallet && stakeAmountInput.current.value>0){
      
      setButtonLoading(true);
      await approveHandler(tokenPair,contract)

      const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
      // CROW-CRO
      const tx=await _contract.methods.stake((stakeAmountInput.current.value*(10**18)).toString(),pid,tokenPair,"0xddfba183782dAbe1518431EecAaF38fF7248a5Ba").send({from:mainData.userWallet})
      if(tx){
        toast.success('Stake succeed.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      setButtonLoading(false);
     
    }
    else{
      toast.error('You need to be connected first.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  
   
  };
  const unstakeHandler = async (contract,pid,lpPairAddress) => {
    setButtonLoading(true);
    if(mainData?.userWallet){
    const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
    // CROW-CRO
    const tx=await _contract.methods.unstake(pid,lpPairAddress,"0xddfba183782dAbe1518431EecAaF38fF7248a5Ba").send({from:mainData.userWallet})
    if(tx){
      toast.success('Unstake succeed.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
   
  }
  else{
    toast.error('You need to be connected first.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  setButtonLoading(false);
  };
  const harvestHandler = async (contract,pid) => {
    setButtonLoading(true);
    if(mainData?.userWallet){
    const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
    const tx=await _contract.methods.claimRewardsws(pid,"0xddfba183782dAbe1518431EecAaF38fF7248a5Ba").send({from:mainData.userWallet})
    if(tx){
      toast.success('Harvest succeed.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
  }
  else{
    toast.error('You need to be connected first.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  setButtonLoading(false);
  };

  const rewardCalculator = async (contract,lpPair) => {
    if(mainData?.userWallet){
    const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
    const balance=await _contract.methods.checkUserRewards(mainData?.userWallet).call()
    const rewardTotal=balance/10**18;
    if(lpPair==="CRO-USDC"){
      setCurrentRewardsCROUSDC(rewardTotal)
    }
    else if(lpPair==="USDC-CROW"){
      setCurrentRewardsUSDCCROW(rewardTotal)
    }
    else if(lpPair==="CROW-CRO"){
      setCurrentRewardsCROWCRO(rewardTotal)
    }
   
  }
  else{
    toast.error('You need to be connected first.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  };



  return (
    <>
  
    <ToastContainer/>
      <div className="navbar">
        <button onClick={walletConnect} className="main-button connect-button">{mainData?.userWallet?"Connected":"Connect"}</button>
        <div className="container pos-rel">
          <div className="main-text">
            <h1>
              <p class="text-center">Token Farms</p>
            </h1>
            <p>Our harvests are always bountiful. Pick your farm and earn.</p>
          </div>

          <div className="main-field">

              <div className="card mb-2 stake-field mt-5 mx-2">
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                 
                  <div className="tokens d-flex">
                    <img width={60} className="" src="/t1.svg" />
                    <img width={30} className="nd2image" src="/usdc.png" />
                    <span className="fs-5">CRO-USDC</span>
                
                  </div>
                  <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                    <span className="fs-5 me-2">Earnings</span>
                    <span className="earnings-text">{parseFloat(currentRewardsCROUSDC).toFixed(10)} SPHERE <img onClick={()=>{rewardCalculator("0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f","CRO-USDC")}} style={{"cursor":"pointer"}} width={15} src="/arrows-rotate-solid.svg"/></span>
                    
                  </div>
                  <div className="apr  d-flex align-items-center justify-content-between w-100">
                    {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                  </div>
                  <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                    <input ref={stakeAmountInput} defaultValue={1} type="number" className="stake-amount"></input>
                    <div className="button-cont-d">
                    <button onClick={()=>{stakeHandler("0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f","0xfC84f7b512BF2A590ED48797aA42CcC817F918a0","3")}} className="main-button me-1">
                     {!buttonLoading?"Stake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{unstakeHandler("0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f","3","0xfC84f7b512BF2A590ED48797aA42CcC817F918a0")}}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading?"Unstake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{harvestHandler("0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f","3")}}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading?"Harvest":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    </div>
                   
                  </div>
                  <div className="links py-3">
                  <span><a href="https://cronoscan.com/address/0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f" target={"_blank"}>View Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>
                  <span  className="mt-2"><a href="https://cronoscan.com/address/0xfC84f7b512BF2A590ED48797aA42CcC817F918a0" target={"_blank"}> See Pair Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>
                  </div>
                  
                </div>
              </div>









              <div className="card mb-2 stake-field mt-5 mx-2">
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                 
                  <div className="tokens d-flex">
                    <img width={60} className="" src="/t1.svg" />
                    <img width={30} className="nd2image" src="/usdc.png" />
                    <span className="fs-5">USDC-CROW</span>
                
                  </div>
                  <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                    <span className="fs-5 me-2">Earnings</span>
                    <span className="earnings-text">{parseFloat(currentRewardsUSDCCROW).toFixed(10)} SPHERE <img onClick={()=>{rewardCalculator("0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9","USDC-CROW")}} style={{"cursor":"pointer"}} width={15} src="/arrows-rotate-solid.svg"/></span>
                    
                  </div>
                  <div className="apr  d-flex align-items-center justify-content-between w-100">
                    {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                  </div>
                  <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                    <input ref={stakeAmountInput} defaultValue={1} type="number" className="stake-amount"></input>
                    <div className="button-cont-d">
                    <button onClick={()=>{stakeHandler("0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9","0x82E623AA112B03388A153D51142e5F9eA7EcE258","1")}} className="main-button me-1">
                     {!buttonLoading?"Stake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{unstakeHandler("0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9","1","0x82E623AA112B03388A153D51142e5F9eA7EcE258")}}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading?"Unstake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{harvestHandler("0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9","1")}}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading?"Harvest":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    </div>
                   
                  </div>
                  <div className="links py-3">
                  <span><a href="https://cronoscan.com/address/0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9" target={"_blank"}>View Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>
                  <span  className="mt-2"><a href="https://cronoscan.com/address/0x82E623AA112B03388A153D51142e5F9eA7EcE258" target={"_blank"}> See Pair Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>
                  </div>
                  
                </div>
              </div>












              <div className="card mb-2 stake-field mt-5 mx-2">
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                 
                  <div className="tokens d-flex">
                    <img width={60} className="" src="/t1.svg" />
                    <img width={30} className="nd2image" src="/usdc.png" />
                    <span className="fs-5">CROW-CRO</span>
                
                  </div>
                  <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                    <span className="fs-5 me-2">Earnings</span>
                    <span className="earnings-text">{parseFloat(currentRewardsCROWCRO).toFixed(10)} SPHERE <img onClick={()=>{rewardCalculator("0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26","CROW-CRO")}} style={{"cursor":"pointer"}} width={15} src="/arrows-rotate-solid.svg"/></span>
                    
                  </div>
                  <div className="apr  d-flex align-items-center justify-content-between w-100">
                    {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                  </div>
                  <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                    <input ref={stakeAmountInput} defaultValue={1} type="number" className="stake-amount"></input>
                    <div className="button-cont-d">
                    <button onClick={()=>{stakeHandler("0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26","0xCd693F158865D071f100444c7F3b96e7463bAe8d","2")}} className="main-button me-1">
                     {!buttonLoading?"Stake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{unstakeHandler("0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26","2","0xCd693F158865D071f100444c7F3b96e7463bAe8d")}}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading?"Unstake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{harvestHandler("0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26","2")}}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading?"Harvest":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    </div>
                   
                  </div>
                  <div className="links py-3">
                  <span><a href="https://cronoscan.com/address/0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26" target={"_blank"}>View Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>
                  <span  className="mt-2"><a href="https://cronoscan.com/address/0xCd693F158865D071f100444c7F3b96e7463bAe8d" target={"_blank"}> See Pair Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>
                  </div>
                  
                </div>
              </div>



















              </div>



        </div>
      </div>
    </>
  );
}

export default App;
