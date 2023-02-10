import { CHAIN_ID } from "config";
import { useEffect } from "react";
declare var window: any;

type EventEthT = {
	address: string | undefined;
	setAddress?: React.Dispatch<React.SetStateAction<undefined | string>>;
	setApprove?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useEventEth = ({ address, setAddress, setApprove }: EventEthT) => {
	useEffect(() => {
		try {
			if (window.ethereum) {
				window.ethereum.on(
					"accountsChanged",
					async (account: string[]) => {
						if (address === account[0]) return;
						if (!account[0]) {
							setAddress && setAddress(undefined);
							return;
						}
						if (window.ethereum.chainId !== CHAIN_ID) {
							await window.ethereum.request({
								method: "wallet_switchEthereumChain",
								params: [{ chainId: CHAIN_ID }],
							});
						}
						setAddress && setAddress(account[0]);
						setApprove && setApprove(false);
					}
				);
				window.ethereum.on("networkChanged", async () => {
					if (window.ethereum.chainId !== CHAIN_ID) {
						await window.ethereum.request({
							method: "wallet_switchEthereumChain",
							params: [{ chainId: CHAIN_ID }],
						});
						setApprove && setApprove(false);
					}
				});
				window.ethereum.on("disconnect", () => {
					setAddress && setAddress(undefined);
					setApprove && setApprove(false);
				});
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
};
