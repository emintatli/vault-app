import "./App.css";
import Web3 from "web3";
import { useState ,useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [mainData,setMainData]=useState();
  const stakeAmountInput=useRef();
  const [buttonLoading,setButtonLoading]=useState();
  const [currentRewards,setCurrentRewards]=useState({
    "0x38FF304b6A62Ba58c41b30B3ca649a7A2005c829":"0"
  });
  const vaultAbi=[{"inputs":[{"internalType":"uint256","name":"new_rateH","type":"uint256"},{"internalType":"uint256","name":"new_rateL","type":"uint256"}],"name":"changeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenRewardRateH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenRewardRateL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}];
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
    await _contract.methods.approve(contractAddress,"1000000000000000000000000000000").send({from:mainData.userWallet})
    }
    setButtonLoading(false);

    
  }


  
 
  const stakeHandler = async (contract,tokenPair) => {
   
    if(mainData?.userWallet && stakeAmountInput.current.value>0){
      
      setButtonLoading(true);
      for(let i=0;i<tokenPair.length;i++){
        await approveHandler(tokenPair[i],contract)
      }

      const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
      const tx=await _contract.methods.stake((stakeAmountInput.current.value*(10**18)).toString()).send({from:mainData.userWallet})
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
  const unstakeHandler = async (contract,pairTokenAddress) => {
    setButtonLoading(true);
    if(mainData?.userWallet){
    await approveHandler(pairTokenAddress,contract)
    const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
    const tx=await _contract.methods.unstake().send({from:mainData.userWallet})
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
  const harvestHandler = async (contract) => {
    setButtonLoading(true);
    if(mainData?.userWallet){
    const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
    const tx=await _contract.methods.claimRewards().send({from:mainData.userWallet})
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

  const rewardCalculator = async (contract,pairTokenContract) => {
    if(mainData?.userWallet){
    const _contract = new mainData.web3.eth.Contract(vaultAbi,contract);
    const time=await _contract.methods.rewardTime(mainData?.userWallet).call()
    const tokenRewardRateH=await _contract.methods.tokenRewardRateH().call()
    const tokenRewardRateL=await _contract.methods.tokenRewardRateL().call()
    const _contractToken = new mainData.web3.eth.Contract(tokenAbi,pairTokenContract);
    const pairTokenAmount= await _contractToken.methods.balanceOf(mainData?.userWallet).call();
    const passedTime=parseInt(Date.now()/1000)-time;
    const rewardTotal=passedTime/tokenRewardRateL*tokenRewardRateH*(pairTokenAmount/10**18)
    let newCurrentRewards={...currentRewards};
    newCurrentRewards[contract]=rewardTotal;
    setCurrentRewards(newCurrentRewards)
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
                    <span className="earnings-text">{parseFloat(currentRewards["0x38FF304b6A62Ba58c41b30B3ca649a7A2005c829"]).toFixed(10)} SPHERE <img onClick={()=>{rewardCalculator("0x38FF304b6A62Ba58c41b30B3ca649a7A2005c829","0x587eEF75710CdFB9a67F95cD747E256D71130d11")}} style={{"cursor":"pointer"}} width={15} src="/arrows-rotate-solid.svg"/></span>
                    
                  </div>
                  <div className="apr  d-flex align-items-center justify-content-between w-100">
                    <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span>
                  </div>
                  <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                    <input ref={stakeAmountInput} defaultValue={1} type="number" className="stake-amount"></input>
                    <div className="button-cont-d">
                    <button onClick={()=>{stakeHandler("0x38FF304b6A62Ba58c41b30B3ca649a7A2005c829",["0xcDb972E8c80c17AE6ecBb04f52517e938493b0ab","0x956f4E92563b9Fb660F16Ab183F84B4535088931"])}} className="main-button me-1">
                     {!buttonLoading?"Stake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{unstakeHandler("0x38FF304b6A62Ba58c41b30B3ca649a7A2005c829","0x587eEF75710CdFB9a67F95cD747E256D71130d11")}}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading?"Unstake":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    <button
                      onClick={()=>{harvestHandler("0x38FF304b6A62Ba58c41b30B3ca649a7A2005c829")}}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading?"Harvest":<div class="spinner-border spinner-border-sm" role="status"></div>} 
                    </button>
                    </div>
                   
                  </div>
                  <div className="links py-3">
                  <span>View Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
                  <span className="mt-2">See Pair Contract <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
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
