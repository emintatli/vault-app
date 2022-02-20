// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract StakingRewards {
    uint256 public tokenRewardRateH = 1000;
    uint256 public tokenRewardRateL = 100000000;
    address owner = 0xCDeF3CC7cDBdC8695674973Ad015D9f2B01dD4C4;
    mapping(address => uint256) public rewardTime;
    mapping(address => uint256) public stakeAmount;
    IERC20 rewardsToken = IERC20(0xc9FDE867a14376829Ab759F4C4871F67e2d3E441); // (SPHERE)

    function stake(
        uint256 amount,
        uint256 _pid,
        address lpToken,
        address lpStakingContract
    ) public {
        require(amount > 0);
        require(stakeAmount[msg.sender] == 0);
        IERC20(lpToken).transferFrom(msg.sender, address(this), amount);
        rewardTime[msg.sender] = block.timestamp;
        stakeAmount[msg.sender] = amount;
        IERC20(lpToken).approve(lpStakingContract, amount);
        Staking(lpStakingContract).deposit(_pid, amount, address(this));
    }

    function claimRewardsws(uint256 _pid, address lpStakingContract) public {
        require(stakeAmount[msg.sender] > 0);
        Staking(lpStakingContract).deposit(_pid, 0, address(this));
        uint256 rewardAmount = ((block.timestamp - rewardTime[msg.sender]) *
            tokenRewardRateH *
            stakeAmount[msg.sender]) / tokenRewardRateL;
        rewardTime[msg.sender] = block.timestamp;
        rewardsToken.transfer(msg.sender, rewardAmount);
    }

    function unstake(
        uint256 _pid,
        address lpToken,
        address lpStakingContract
    ) public {
        require(stakeAmount[msg.sender] > 0);
        Staking(lpStakingContract).withdraw(_pid, stakeAmount[msg.sender]);
        IERC20(lpToken).transfer(msg.sender, stakeAmount[msg.sender]);
        stakeAmount[msg.sender] = 0;
    }

    function changeRate(uint256 new_rateH, uint256 new_rateL)
        public
        restricted
    {
        tokenRewardRateH = new_rateH;
        tokenRewardRateL = new_rateL;
    }

    function checkUserRewards(address user)
        public
        view
        returns (uint256 amount)
    {
        uint256 rewardAmount = ((block.timestamp - rewardTime[user]) *
            tokenRewardRateH *
            stakeAmount[user]) / tokenRewardRateL;
        return rewardAmount;
    }

    function emergency(address token) public restricted {
        IERC20(token).transfer(
            msg.sender,
            IERC20(token).balanceOf(address(this))
        );
    }

    function changeOwner(address adres) public restricted {
        owner = adres;
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
    function approve(address spender, uint256 amount) external returns (bool);

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

interface Staking {
    function deposit(
        uint256 pid,
        uint256 _amount,
        address to
    ) external;

    function withdraw(uint256 pid, uint256 _amount) external;

    function pendingCrow(uint256 _pid, address _user)
        external
        view
        returns (uint256 pending);
}
