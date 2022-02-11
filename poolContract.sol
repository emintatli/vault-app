// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract StakingRewards {
    uint256 public tokenRewardRateH = 100000000;
    uint256 public tokenRewardRateL = 100000000;
    address owner = 0xCDeF3CC7cDBdC8695674973Ad015D9f2B01dD4C4;
    mapping(address => uint256) public rewardTime;

    IERC20 stakingTokenP1 = IERC20(0xcDb972E8c80c17AE6ecBb04f52517e938493b0ab); // wcro
    IERC20 stakingTokenP2 = IERC20(0x956f4E92563b9Fb660F16Ab183F84B4535088931); // USDC
    IERC20 stakingTokenPair = IERC20(0x587eEF75710CdFB9a67F95cD747E256D71130d11); // wcro-USDC
    IERC20 rewardsToken = IERC20(0x076633F276863b9b7A4B499031931502B334995b); // Cronosphere (SPHERE)

    function stake(uint256 amount) public {
        require(amount > 0);
        stakingTokenP1.transferFrom(msg.sender, address(this), amount);
        stakingTokenP2.transferFrom(msg.sender, address(this), amount);
        if(rewardTime[msg.sender]==0){
        rewardTime[msg.sender] = block.timestamp;
        }
        stakingTokenPair.transfer(msg.sender, amount);
    }

    function claimRewards() public {
        uint256 balanceOfPair = stakingTokenPair.balanceOf(msg.sender);
       uint256 rewardAmount = ((block.timestamp - rewardTime[msg.sender])*tokenRewardRateH * balanceOfPair) / tokenRewardRateL;
        require(rewardAmount > 0);
        rewardTime[msg.sender] = block.timestamp;
        rewardsToken.transfer(msg.sender, rewardAmount);
    }

    function unstake() public {
        uint256 balanceOfPair = stakingTokenPair.balanceOf(msg.sender);
        uint256 rewardAmount = ((block.timestamp - rewardTime[msg.sender])*tokenRewardRateH * balanceOfPair) / tokenRewardRateL;
        require(rewardAmount > 0);
        rewardTime[msg.sender] = block.timestamp;
        rewardsToken.transfer(msg.sender, rewardAmount);

        stakingTokenPair.transferFrom(msg.sender, address(this), balanceOfPair);
        stakingTokenP1.transfer(msg.sender, balanceOfPair);
        stakingTokenP2.transfer(msg.sender, balanceOfPair);
        rewardTime[msg.sender]=0;
    }

    function changeRate(uint256 new_rateH, uint256 new_rateL)
        public
        restricted
    {
        tokenRewardRateH = new_rateH;
        tokenRewardRateL = new_rateL;
    }

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }
}

interface IERC20 {
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}
