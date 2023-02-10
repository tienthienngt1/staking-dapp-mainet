import { CHAIN_ID } from "config";

declare var window: any;

export const connectWallet = async () => {
	if (window.ethereum) {
		try {
			const account = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			if (window.ethereum.chainId !== CHAIN_ID) {
				await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: CHAIN_ID }],
				});
			}
			return account[0];
		} catch (error) {
			console.log(error);
		}
	} else {
		alert("Please install Metamask!");
		return;
	}
};
