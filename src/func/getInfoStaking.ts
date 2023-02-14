import { initialContractStaking } from "./initialContract";
const { contractStaking, web3Staking } = initialContractStaking();

export const getRewardPool = async () => {
	if (contractStaking && web3Staking) {
		try {
			const pool = await contractStaking.methods.rewardsPool().call();
			return Number(web3Staking.utils.fromWei(pool, "gwei"));
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};
export const getPoolStake = async () => {
	if (contractStaking && web3Staking) {
		try {
			const pool = await contractStaking.methods.poolStake().call();
			return Number(web3Staking.utils.fromWei(pool, "gwei"));
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};
export const getAmountStake = async (address: string) => {
	if (contractStaking && web3Staking) {
		try {
			const amount = await contractStaking.methods
				.amountStaked(address)
				.call();
			return Number(web3Staking.utils.fromWei(amount, "gwei"));
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};

export const harvestToken = async (address: string) => {
	if (contractStaking && web3Staking) {
		try {
			const res = await contractStaking.methods
				.harvestStake()
				.send({ from: address });
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const withdrawToken = async (address: string) => {
	if (contractStaking && web3Staking) {
		try {
			const res = await contractStaking.methods
				.withdrawStake()
				.send({ from: address });
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const stakeToken = async (address: string, amount: number) => {
	if (contractStaking && web3Staking) {
		try {
			const res = await contractStaking.methods
				.stake(web3Staking.utils.toWei(amount.toString(), "gwei"))
				.send({ from: address });
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getProfit = async (address: string) => {
	if (contractStaking && web3Staking) {
		try {
			const amount = await contractStaking.methods
				.profitStakePerUser(address)
				.call({ from: address });
			return Number(web3Staking.utils.fromWei(amount, "gwei"));
		} catch (error) {
			return;
		}
	}
	return;
};
