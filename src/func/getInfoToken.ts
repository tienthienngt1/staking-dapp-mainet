import { CONTRACT_ADDRESS_STAKING, CONTRACT_ADDRESS_TOKEN } from "config";
import { initialContractToken } from "./initialContract";
const { contractToken, web3Token } = initialContractToken();

export const getAllowance = async (address: string) => {
	if (contractToken && web3Token) {
		try {
			const balance = await contractToken.methods
				.allowance(address, CONTRACT_ADDRESS_TOKEN)
				.call();
			return Number(web3Token.utils.fromWei(balance, "gwei"));
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};

export const getBalance = async (address: string) => {
	if (contractToken && web3Token) {
		try {
			const balance = await contractToken.methods
				.balanceOf(address)
				.call();
			return Number(web3Token.utils.fromWei(balance, "gwei"));
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};

export const approve = async (address: string, amount: string) => {
	if (contractToken && web3Token) {
		try {
			const res = await contractToken.methods
				.approve(
					CONTRACT_ADDRESS_STAKING,
					web3Token.utils.toWei(amount, "gwei")
				)
				.send({ from: address });
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};
