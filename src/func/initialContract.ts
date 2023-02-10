import {
	ABI_STAKING,
	ABI_TOKEN,
	CONTRACT_ADDRESS_STAKING,
	CONTRACT_ADDRESS_TOKEN,
} from "config";
import Web3 from "web3";
declare var window: any;

export const initialContractStaking = () => {
	if (window.ethereum) {
		const web3Staking = new Web3(window.ethereum);
		const contractStaking = new web3Staking.eth.Contract(
			//@ts-ignore
			ABI_STAKING,
			CONTRACT_ADDRESS_STAKING
		);
		return { contractStaking, web3Staking };
	}
	return { contractStaking: undefined, web3Staking: undefined };
};

export const initialContractToken = () => {
	if (window.ethereum) {
		const web3Token = new Web3(window.ethereum);
		const contractToken = new web3Token.eth.Contract(
			//@ts-ignore
			ABI_TOKEN,
			CONTRACT_ADDRESS_TOKEN
		);
		return { contractToken, web3Token };
	}
	return { contractToken: undefined, web3Token: undefined };
};
