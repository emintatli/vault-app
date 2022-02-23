import "./App.css";
import Web3 from "web3";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bigInt from "big-integer";
function App() {
  const [mainData, setMainData] = useState();
  const stakeAmountInputCROUSDC = useRef();
  const stakeAmountInputUSDCCROW = useRef();
  const stakeAmountInputCROWCRO = useRef();
  const stakeAmountInputCROVVS = useRef();
  const stakeAmountInputCNFTCNO = useRef();
  const stakeAmountInputDAIUSDC = useRef();
  const [buttonLoading, setButtonLoading] = useState();
  const [apr, setApr] = useState("0");
  const [currentRewardsCROUSDC, setCurrentRewardsCROUSDC] = useState("0");
  const [currentRewardsUSDCCROW, setCurrentRewardsUSDCCROW] = useState("0");
  const [currentRewardsCROWCRO, setCurrentRewardsCROWCRO] = useState("0");
  const [currentRewardsCROVVS, setCurrentRewardsCROVVS] = useState("0");
  const [currentRewardsCNFTCNO, setCurrentRewardsCNFTCNO] = useState("0");
  const [currentRewardsDAIUSDC, setCurrentRewardsDAIUSDC] = useState("0");

  const vaultAbiVVS = [
    {
      inputs: [{ internalType: "address", name: "adres", type: "address" }],
      name: "changeOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "new_rateH", type: "uint256" },
        { internalType: "uint256", name: "new_rateL", type: "uint256" },
      ],
      name: "changeRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "checkUserRewards",
      outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "lpStakingContract", type: "address" },
      ],
      name: "claimRewardsws",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "emergency",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "rewardTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "lpToken", type: "address" },
        { internalType: "address", name: "lpStakingContract", type: "address" },
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "stakeAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenRewardRateH",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenRewardRateL",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "lpToken", type: "address" },
        { internalType: "address", name: "lpStakingContract", type: "address" },
      ],
      name: "unstake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const vaultAbi = [
    {
      inputs: [{ internalType: "address", name: "adres", type: "address" }],
      name: "changeOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "new_rateH", type: "uint256" },
        { internalType: "uint256", name: "new_rateL", type: "uint256" },
      ],
      name: "changeRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "checkUserRewards",
      outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "lpStakingContract", type: "address" },
      ],
      name: "claimRewardsws",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "emergency",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "rewardTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "lpToken", type: "address" },
        { internalType: "address", name: "lpStakingContract", type: "address" },
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "stakeAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenRewardRateH",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenRewardRateL",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "lpToken", type: "address" },
        { internalType: "address", name: "lpStakingContract", type: "address" },
      ],
      name: "unstake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const tokenAbi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_from",
          type: "address",
        },
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
  ];

  const walletConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = window.ethereum;
    const userWallet = accounts[0];
    const web3 = new Web3(provider);

    setMainData({
      userWallet,
      web3,
    });
  };

  // useEffect(async()=>{
  //   setApr({
  //     CROUSDC:await aprCalc("0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f"),
  //     USDCCROW:await aprCalc("0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9"),
  //     CROWCRO:await aprCalc("0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26"),
  //     CROVVS:await aprCalc("0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F"),
  //     CNFTCNO:await aprCalc("0xC06d6628D388359a5084288D34E6baB7a473af2B"),
  //     DAIUSDC:await aprCalc("0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0")
  //   });
  // },[])

  // useEffect(()=>{
  //   console.log(apr)
  // },[apr])

  // const aprCalc=async(vaultcontractAddress)=>{

  //   const minAbi=[ {
  //     inputs: [],
  //     name: "tokenRewardRateH",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "tokenRewardRateL",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   }]
  //   const web3=new Web3("https://rpc.vvs.finance");
  //   const _contract = new web3.eth.Contract(minAbi,vaultcontractAddress);
  //   const tokenRewardRateH=await _contract.methods.tokenRewardRateH().call();
  //   const tokenRewardRateL=await _contract.methods.tokenRewardRateL().call();
  //   let contractDepositAmount=0;
  //   if(vaultcontractAddress==="0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0"){
  //     contractDepositAmount=0.0001;
  //   }
  //   else if(vaultcontractAddress==="0xC06d6628D388359a5084288D34E6baB7a473af2B"){
  //     contractDepositAmount=0.0001;
  //   }
  //   else if(vaultcontractAddress==="0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F"){
  //     contractDepositAmount=5500;
  //   }
  //   else if(vaultcontractAddress==="0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26"){
  //     contractDepositAmount=0.0001;
  //   }
  //   else if(vaultcontractAddress==="0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9"){
  //     contractDepositAmount=0.003;
  //   }
  //   else if(vaultcontractAddress==="0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f"){
  //     contractDepositAmount=0.00006;
  //   }

  //   return tokenRewardRateH/tokenRewardRateL*31556926*contractDepositAmount;
  // }

  const approveHandler = async (tokenContractAddress, contractAddress) => {
    setButtonLoading(true);
    const _contract = new mainData.web3.eth.Contract(
      tokenAbi,
      tokenContractAddress
    );
    const allowance = await _contract.methods
      .allowance(mainData.userWallet, contractAddress)
      .call();
    if (!(allowance > 0)) {
      await _contract.methods
        .approve(contractAddress, "100000000000000000000000000000000000")
        .send({ from: mainData.userWallet });
    }
    setButtonLoading(false);
  };

  const maxValue = async (tokenContract) => {
    const _contract = new mainData.web3.eth.Contract(tokenAbi, tokenContract);
    const balanceOf = await _contract.methods
      .balanceOf(mainData.userWallet)
      .call();
    console.log(balanceOf);
    if (tokenContract === "0xfC84f7b512BF2A590ED48797aA42CcC817F918a0") {
      stakeAmountInputCROUSDC.current.value = (balanceOf-1000) / 10 ** 18;
    } else if (tokenContract === "0x82E623AA112B03388A153D51142e5F9eA7EcE258") {
      stakeAmountInputUSDCCROW.current.value = (balanceOf-1000) / 10 ** 18;
    } else if (tokenContract === "0xCd693F158865D071f100444c7F3b96e7463bAe8d") {
      stakeAmountInputCROWCRO.current.value = (balanceOf-1000) / 10 ** 18;
    } else if (tokenContract === "0xbf62c67eA509E86F07c8c69d0286C0636C50270b") {
      stakeAmountInputCROVVS.current.value = (balanceOf-1000) / 10 ** 18;
    } else if (tokenContract === "0xf91F9B62eE4c377C38726b53F8e2761a678B3F88") {
      stakeAmountInputCNFTCNO.current.value = (balanceOf-1000) / 10 ** 18;
    } else if (tokenContract === "0x0bfed62c922b14b9a47Ab800c89A3a952911Ed9C") {
      stakeAmountInputDAIUSDC.current.value = (balanceOf-1000) / 10 ** 18;
    }
  };

  const stakeHandler = async (contract, tokenPair, pid) => {
    if (mainData?.userWallet) {
      setButtonLoading(true);
      await approveHandler(tokenPair, contract);
      let tx;
      const _contract = new mainData.web3.eth.Contract(vaultAbi, contract);
      // CROW-CRO
      if (pid === "3") {
        tx = await _contract.methods
          .stake(
            bigInt(stakeAmountInputCROUSDC.current.value * 10 ** 18).toString(),
            pid,
            tokenPair,
            "0xddfba183782dAbe1518431EecAaF38fF7248a5Ba"
          )
          .send({ from: mainData.userWallet });
      } else if (pid === "2") {
        tx = await _contract.methods
          .stake(
            bigInt(stakeAmountInputCROWCRO.current.value * 10 ** 18).toString(),
            pid,
            tokenPair,
            "0xddfba183782dAbe1518431EecAaF38fF7248a5Ba"
          )
          .send({ from: mainData.userWallet });
      } else if (pid === "1") {
        tx = await _contract.methods
          .stake(
            bigInt(
              stakeAmountInputUSDCCROW.current.value * 10 ** 18
            ).toString(),
            pid,
            tokenPair,
            "0xddfba183782dAbe1518431EecAaF38fF7248a5Ba"
          )
          .send({ from: mainData.userWallet });
      }

      if (tx) {
        toast.success("Stake succeed.", {
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
    } else {
      toast.error("You need to be connected first.", {
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

  const stakeHandlerVVS = async (contract, tokenPair, pid) => {
    if (mainData?.userWallet) {
      setButtonLoading(true);
      await approveHandler(tokenPair, contract);
      let tx;
      const _contract = new mainData.web3.eth.Contract(vaultAbiVVS, contract);
      // CRO-VVS
      if (pid === "4") {
        console.log(
          bigInt(stakeAmountInputCROVVS.current.value * 10 ** 18).toString()
        );
        tx = await _contract.methods
          .stake(
            bigInt(stakeAmountInputCROVVS.current.value * 10 ** 18).toString(),
            pid,
            tokenPair,
            "0xDccd6455AE04b03d785F12196B492b18129564bc"
          )
          .send({ from: mainData.userWallet });
      }

      if (tx) {
        toast.success("Stake succeed.", {
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
    } else {
      toast.error("You need to be connected first.", {
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

  const stakeHandlerChrono = async (contract, tokenPair, pid) => {
    if (mainData?.userWallet) {
      setButtonLoading(true);
      await approveHandler(tokenPair, contract);
      let tx;
      const _contract = new mainData.web3.eth.Contract(vaultAbiVVS, contract);
      // CNFT-CNO
      if (pid === "49") {
        tx = await _contract.methods
          .stake(
            bigInt(stakeAmountInputCNFTCNO.current.value * 10 ** 18).toString(),
            pid,
            tokenPair,
            "0x3790F3A1cf8A478042Ec112A70881Dcfa9c7fd2a"
          )
          .send({ from: mainData.userWallet });
      }
      //DAI-USDC
      else if (pid === "9") {
        tx = await _contract.methods
          .stake(
            bigInt(stakeAmountInputDAIUSDC.current.value * 10 ** 18).toString(),
            pid,
            tokenPair,
            "0x3790F3A1cf8A478042Ec112A70881Dcfa9c7fd2a"
          )
          .send({ from: mainData.userWallet });
      }

      if (tx) {
        toast.success("Stake succeed.", {
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
    } else {
      toast.error("You need to be connected first.", {
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

  const unstakeHandler = async (contract, pid, lpPairAddress) => {
    setButtonLoading(true);
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbiVVS, contract);
      // CROW-CRO
      const tx = await _contract.methods
        .unstake(
          pid,
          lpPairAddress,
          "0xddfba183782dAbe1518431EecAaF38fF7248a5Ba"
        )
        .send({ from: mainData.userWallet });
      if (tx) {
        toast.success("Unstake succeed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You need to be connected first.", {
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

  const unstakeHandlerVVS = async (contract, pid, lpPairAddress) => {
    setButtonLoading(true);
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbiVVS, contract);
      // CROW-CRO
      const tx = await _contract.methods
        .unstake(
          pid,
          lpPairAddress,
          "0xDccd6455AE04b03d785F12196B492b18129564bc"
        )
        .send({ from: mainData.userWallet });
      if (tx) {
        toast.success("Unstake succeed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You need to be connected first.", {
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

  const unstakeHandlerChrono = async (contract, pid, lpPairAddress) => {
    setButtonLoading(true);
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbiVVS, contract);
      // CROW-CRO
      const tx = await _contract.methods
        .unstake(
          pid,
          lpPairAddress,
          "0x3790F3A1cf8A478042Ec112A70881Dcfa9c7fd2a"
        )
        .send({ from: mainData.userWallet });
      if (tx) {
        toast.success("Unstake succeed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You need to be connected first.", {
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

  const harvestHandler = async (contract, pid) => {
    setButtonLoading(true);
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbi, contract);
      const tx = await _contract.methods
        .claimRewardsws(pid, "0xddfba183782dAbe1518431EecAaF38fF7248a5Ba")
        .send({ from: mainData.userWallet });
      if (tx) {
        toast.success("Harvest succeed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You need to be connected first.", {
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

  const harvestHandlerVVS = async (contract, pid) => {
    setButtonLoading(true);
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbi, contract);
      const tx = await _contract.methods
        .claimRewardsws(pid, "0xDccd6455AE04b03d785F12196B492b18129564bc")
        .send({ from: mainData.userWallet });
      if (tx) {
        toast.success("Harvest succeed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You need to be connected first.", {
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

  const harvestHandlerChrono = async (contract, pid) => {
    setButtonLoading(true);
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbi, contract);
      const tx = await _contract.methods
        .claimRewardsws(pid, "0x3790F3A1cf8A478042Ec112A70881Dcfa9c7fd2a")
        .send({ from: mainData.userWallet });
      if (tx) {
        toast.success("Harvest succeed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("You need to be connected first.", {
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

  const rewardCalculator = async (contract, lpPair) => {
    if (mainData?.userWallet) {
      const _contract = new mainData.web3.eth.Contract(vaultAbi, contract);
      const balance = await _contract.methods
        .checkUserRewards(mainData?.userWallet)
        .call();
      const rewardTotal = balance / 10 ** 18;
      if (lpPair === "CRO-USDC") {
        setCurrentRewardsCROUSDC(rewardTotal);
      } else if (lpPair === "USDC-CROW") {
        setCurrentRewardsUSDCCROW(rewardTotal);
      } else if (lpPair === "CROW-CRO") {
        setCurrentRewardsCROWCRO(rewardTotal);
      } else if (lpPair === "CRO-VVS") {
        setCurrentRewardsCROVVS(rewardTotal);
      } else if (lpPair === "CNFT-CNO") {
        setCurrentRewardsCNFTCNO(rewardTotal);
      } else if (lpPair === "DAI-USDC") {
        setCurrentRewardsDAIUSDC(rewardTotal);
      }
    } else {
      toast.error("You need to be connected first.", {
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
      <ToastContainer />
      <div className="navbar">
        <button onClick={walletConnect} className="main-button connect-button">
          {mainData?.userWallet ? "Connected" : "Connect"}
        </button>
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
                  <span className="earnings-text">
                    {parseFloat(currentRewardsCROUSDC).toFixed(10)} SPHERE{" "}
                    <img
                      onClick={() => {
                        rewardCalculator(
                          "0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f",
                          "CRO-USDC"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      width={15}
                      src="/arrows-rotate-solid.svg"
                    />
                  </span>
                </div>
                <div className="apr  d-flex align-items-center justify-content-between w-100">
                  {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                </div>
                <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                  <div className="input-container">
                    <button
                      className="max-button"
                      onClick={() => {
                        maxValue("0xfC84f7b512BF2A590ED48797aA42CcC817F918a0");
                      }}
                    >
                      Max
                    </button>
                    <input
                      ref={stakeAmountInputCROUSDC}
                      defaultValue={1}
                      type="number"
                      className="stake-amount"
                    ></input>
                  </div>

                  <div className="button-cont-d">
                    <button
                      onClick={() => {
                        stakeHandler(
                          "0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f",
                          "0xfC84f7b512BF2A590ED48797aA42CcC817F918a0",
                          "3"
                        );
                      }}
                      className="main-button me-1"
                    >
                      {!buttonLoading ? (
                        "Stake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        unstakeHandler(
                          "0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f",
                          "3",
                          "0xfC84f7b512BF2A590ED48797aA42CcC817F918a0"
                        );
                      }}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading ? (
                        "Unstake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        harvestHandler(
                          "0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f",
                          "3"
                        );
                      }}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading ? (
                        "Harvest"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="links py-3">
                  <span>
                    <a
                      href="https://cronoscan.com/address/0x6ED0B4730f52a977186DBCB6e712fD13Fd36Db2f"
                      target={"_blank"}
                    >
                      View Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                  <span className="mt-2">
                    <a
                      href="https://cronoscan.com/address/0xfC84f7b512BF2A590ED48797aA42CcC817F918a0"
                      target={"_blank"}
                    >
                      {" "}
                      See Pair Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="card mb-2 stake-field mt-5 mx-2">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="tokens d-flex">
                  <img
                    width={60}
                    className=""
                    src="https://crowfi.app/images/tokens/0x285c3329930a3fd3C7c14bC041d3E50e165b1517.svg"
                  />
                  <img width={30} className="nd2image" src="/usdc.png" />
                  <span className="fs-5">USDC-CROW</span>
                </div>
                <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                  <span className="fs-5 me-2">Earnings</span>
                  <span className="earnings-text">
                    {parseFloat(currentRewardsUSDCCROW).toFixed(10)} SPHERE{" "}
                    <img
                      onClick={() => {
                        rewardCalculator(
                          "0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9",
                          "USDC-CROW"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      width={15}
                      src="/arrows-rotate-solid.svg"
                    />
                  </span>
                </div>
                <div className="apr  d-flex align-items-center justify-content-between w-100">
                  {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                </div>
                <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                  <div className="input-container">
                    <button
                      className="max-button"
                      onClick={() => {
                        maxValue("0x82E623AA112B03388A153D51142e5F9eA7EcE258");
                      }}
                    >
                      Max
                    </button>
                    <input
                      ref={stakeAmountInputUSDCCROW}
                      defaultValue={1}
                      type="number"
                      className="stake-amount"
                    ></input>
                  </div>
                  <div className="button-cont-d">
                    <button
                      onClick={() => {
                        stakeHandler(
                          "0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9",
                          "0x82E623AA112B03388A153D51142e5F9eA7EcE258",
                          "1"
                        );
                      }}
                      className="main-button me-1"
                    >
                      {!buttonLoading ? (
                        "Stake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        unstakeHandler(
                          "0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9",
                          "1",
                          "0x82E623AA112B03388A153D51142e5F9eA7EcE258"
                        );
                      }}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading ? (
                        "Unstake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        harvestHandler(
                          "0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9",
                          "1"
                        );
                      }}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading ? (
                        "Harvest"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="links py-3">
                  <span>
                    <a
                      href="https://cronoscan.com/address/0x851dBA7B46a586E363F3a77a9Ae42f4BF28dF0e9"
                      target={"_blank"}
                    >
                      View Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                  <span className="mt-2">
                    <a
                      href="https://cronoscan.com/address/0x82E623AA112B03388A153D51142e5F9eA7EcE258"
                      target={"_blank"}
                    >
                      {" "}
                      See Pair Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="card mb-2 stake-field mt-5 mx-2">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="tokens d-flex">
                  <img width={60} className="" src="/t1.svg" />
                  <img
                    width={30}
                    className="nd2image"
                    src="https://crowfi.app/images/tokens/0x285c3329930a3fd3C7c14bC041d3E50e165b1517.svg"
                  />
                  <span className="fs-5">CROW-CRO</span>
                </div>
                <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                  <span className="fs-5 me-2">Earnings</span>
                  <span className="earnings-text">
                    {parseFloat(currentRewardsCROWCRO).toFixed(10)} SPHERE{" "}
                    <img
                      onClick={() => {
                        rewardCalculator(
                          "0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26",
                          "CROW-CRO"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      width={15}
                      src="/arrows-rotate-solid.svg"
                    />
                  </span>
                </div>
                <div className="apr  d-flex align-items-center justify-content-between w-100">
                  {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                </div>
                <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                  <div className="input-container">
                    <button
                      className="max-button"
                      onClick={() => {
                        maxValue("0xCd693F158865D071f100444c7F3b96e7463bAe8d");
                      }}
                    >
                      Max
                    </button>
                    <input
                      ref={stakeAmountInputCROWCRO}
                      defaultValue={1}
                      type="number"
                      className="stake-amount"
                    ></input>
                  </div>
                  <div className="button-cont-d">
                    <button
                      onClick={() => {
                        stakeHandler(
                          "0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26",
                          "0xCd693F158865D071f100444c7F3b96e7463bAe8d",
                          "2"
                        );
                      }}
                      className="main-button me-1"
                    >
                      {!buttonLoading ? (
                        "Stake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        unstakeHandler(
                          "0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26",
                          "2",
                          "0xCd693F158865D071f100444c7F3b96e7463bAe8d"
                        );
                      }}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading ? (
                        "Unstake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        harvestHandler(
                          "0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26",
                          "2"
                        );
                      }}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading ? (
                        "Harvest"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="links py-3">
                  <span>
                    <a
                      href="https://cronoscan.com/address/0x4565bbdeaFFD9Ffa358daA1fE9B4D8C311aE8C26"
                      target={"_blank"}
                    >
                      View Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                  <span className="mt-2">
                    <a
                      href="https://cronoscan.com/address/0xCd693F158865D071f100444c7F3b96e7463bAe8d"
                      target={"_blank"}
                    >
                      {" "}
                      See Pair Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="card mb-2 stake-field mt-5 mx-2">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="tokens d-flex">
                  <img width={60} className="" src="/t1.svg" />
                  <img
                    width={30}
                    className="nd2image"
                    src="https://vvs.finance/images/tokens/0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03.svg"
                  />
                  <span className="fs-5">CRO-VVS</span>
                </div>
                <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                  <span className="fs-5 me-2">Earnings</span>
                  <span className="earnings-text">
                    {parseFloat(currentRewardsCROVVS).toFixed(10)} SPHERE{" "}
                    <img
                      onClick={() => {
                        rewardCalculator(
                          "0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F",
                          "CRO-VVS"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      width={15}
                      src="/arrows-rotate-solid.svg"
                    />
                  </span>
                </div>
                <div className="apr  d-flex align-items-center justify-content-between w-100">
                  {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                </div>
                <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                  <div className="input-container">
                    <button
                      className="max-button"
                      onClick={() => {
                        maxValue("0xbf62c67eA509E86F07c8c69d0286C0636C50270b");
                      }}
                    >
                      Max
                    </button>
                    <input
                      ref={stakeAmountInputCROVVS}
                      defaultValue={1}
                      type="number"
                      className="stake-amount"
                    ></input>
                  </div>
                  <div className="button-cont-d">
                    <button
                      onClick={() => {
                        stakeHandlerVVS(
                          "0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F",
                          "0xbf62c67eA509E86F07c8c69d0286C0636C50270b",
                          "4"
                        );
                      }}
                      className="main-button me-1"
                    >
                      {!buttonLoading ? (
                        "Stake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        unstakeHandlerVVS(
                          "0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F",
                          "4",
                          "0xbf62c67eA509E86F07c8c69d0286C0636C50270b"
                        );
                      }}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading ? (
                        "Unstake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        harvestHandlerVVS(
                          "0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F",
                          "4"
                        );
                      }}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading ? (
                        "Harvest"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="links py-3">
                  <span>
                    <a
                      href="https://cronoscan.com/address/0x90b9bD7e0c4f97154B112FEF6dDDBF7734f48E0F"
                      target={"_blank"}
                    >
                      View Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                  <span className="mt-2">
                    <a
                      href="https://cronoscan.com/address/0xbf62c67eA509E86F07c8c69d0286C0636C50270b"
                      target={"_blank"}
                    >
                      {" "}
                      See Pair Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="card mb-2 stake-field mt-5 mx-2">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="tokens d-flex">
                  <img
                    width={60}
                    className=""
                    src="https://chronoswap.org/images/tokens/0x322e21dcAcE43d319646756656b29976291d7C76.svg"
                  />
                  <img
                    width={30}
                    className="nd2image"
                    src="https://chronoswap.org/images/tokens/0xE2589867ad472bD1Aa46407c182E13c08f8Eadc9.svg"
                  />
                  <span className="fs-5">CNFT-CNO</span>
                </div>
                <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                  <span className="fs-5 me-2">Earnings</span>
                  <span className="earnings-text">
                    {parseFloat(currentRewardsCNFTCNO).toFixed(10)} SPHERE{" "}
                    <img
                      onClick={() => {
                        rewardCalculator(
                          "0xC06d6628D388359a5084288D34E6baB7a473af2B",
                          "CNFT-CNO"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      width={15}
                      src="/arrows-rotate-solid.svg"
                    />
                  </span>
                </div>
                <div className="apr  d-flex align-items-center justify-content-between w-100">
                  {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                </div>
                <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                  <div className="input-container">
                    <button
                      className="max-button"
                      onClick={() => {
                        maxValue("0xf91F9B62eE4c377C38726b53F8e2761a678B3F88");
                      }}
                    >
                      Max
                    </button>
                    <input
                      ref={stakeAmountInputCNFTCNO}
                      defaultValue={1}
                      type="number"
                      className="stake-amount"
                    ></input>
                  </div>
                  <div className="button-cont-d">
                    <button
                      onClick={() => {
                        stakeHandlerChrono(
                          "0xC06d6628D388359a5084288D34E6baB7a473af2B",
                          "0xf91F9B62eE4c377C38726b53F8e2761a678B3F88",
                          "49"
                        );
                      }}
                      className="main-button me-1"
                    >
                      {!buttonLoading ? (
                        "Stake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        unstakeHandlerChrono(
                          "0xC06d6628D388359a5084288D34E6baB7a473af2B",
                          "49",
                          "0xf91F9B62eE4c377C38726b53F8e2761a678B3F88"
                        );
                      }}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading ? (
                        "Unstake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        harvestHandlerChrono(
                          "0xC06d6628D388359a5084288D34E6baB7a473af2B",
                          "49"
                        );
                      }}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading ? (
                        "Harvest"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="links py-3">
                  <span>
                    <a
                      href="https://cronoscan.com/address/0xC06d6628D388359a5084288D34E6baB7a473af2B"
                      target={"_blank"}
                    >
                      View Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                  <span className="mt-2">
                    <a
                      href="https://cronoscan.com/address/0xf91F9B62eE4c377C38726b53F8e2761a678B3F88"
                      target={"_blank"}
                    >
                      {" "}
                      See Pair Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="card mb-2 stake-field mt-5 mx-2">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="tokens d-flex">
                  <img
                    width={60}
                    className=""
                    src="https://chronoswap.org/images/tokens/0xF2001B145b43032AAF5Ee2884e456CCd805F677D.svg"
                  />
                  <img width={30} className="nd2image" src="/usdc.png" />
                  <span className="fs-5">DAI-USDC</span>
                </div>
                <div className="token-earnings d-flex align-items-center justify-content-between w-100">
                  <span className="fs-5 me-2">Earnings</span>
                  <span className="earnings-text">
                    {parseFloat(currentRewardsDAIUSDC).toFixed(10)} SPHERE{" "}
                    <img
                      onClick={() => {
                        rewardCalculator(
                          "0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0",
                          "DAI-USDC"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      width={15}
                      src="/arrows-rotate-solid.svg"
                    />
                  </span>
                </div>
                <div className="apr  d-flex align-items-center justify-content-between w-100">
                  {/* <span className="fs-5">APR</span>
                    <span className="earnings-text">35%</span> */}
                </div>
                <div className="token-menu d-flex flex-column align-items-center justify-content-between w-100">
                  <div className="input-container">
                    <button
                      className="max-button"
                      onClick={() => {
                        maxValue("0x0bfed62c922b14b9a47Ab800c89A3a952911Ed9C");
                      }}
                    >
                      Max
                    </button>
                    <input
                      ref={stakeAmountInputDAIUSDC}
                      defaultValue={1}
                      type="number"
                      className="stake-amount"
                    ></input>
                  </div>
                  <div className="button-cont-d">
                    <button
                      onClick={() => {
                        stakeHandlerChrono(
                          "0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0",
                          "0x0bfed62c922b14b9a47Ab800c89A3a952911Ed9C",
                          "9"
                        );
                      }}
                      className="main-button me-1"
                    >
                      {!buttonLoading ? (
                        "Stake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        unstakeHandlerChrono(
                          "0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0",
                          "9",
                          "0x0bfed62c922b14b9a47Ab800c89A3a952911Ed9C"
                        );
                      }}
                      className="main-button unstake-button me-1"
                    >
                      {!buttonLoading ? (
                        "Unstake"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        harvestHandlerChrono(
                          "0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0",
                          "9"
                        );
                      }}
                      className="main-button harvest-button"
                    >
                      {!buttonLoading ? (
                        "Harvest"
                      ) : (
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="links py-3">
                  <span>
                    <a
                      href="https://cronoscan.com/address/0xE3eEa752Ab42EdF2D432C814A0D66E87A59e42F0"
                      target={"_blank"}
                    >
                      View Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
                  <span className="mt-2">
                    <a
                      href="https://cronoscan.com/address/0x0bfed62c922b14b9a47Ab800c89A3a952911Ed9C"
                      target={"_blank"}
                    >
                      {" "}
                      See Pair Contract{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </span>
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
