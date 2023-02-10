import { useEffect, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import StackConfig from "./StackConfig.component";
import LoadingButton from "@mui/lab/LoadingButton";
import { stakeToken, withdrawToken } from "func/getInfoStaking";
import { approve } from "func/getInfoToken";
import { useEventEth } from "hooks/useEventEth";

type InputStakeT = {
	address: string;
	getInfo: () => void;
	staked: number | undefined;
	balance: number | undefined;
	setNotify: React.Dispatch<
		React.SetStateAction<
			| {
					display: boolean;
					text?: string | undefined;
					severity?: "success" | "error" | undefined;
			  }
			| undefined
		>
	>;
};

const InputStake = ({
	address,
	getInfo,
	staked,
	balance,
	setNotify,
}: InputStakeT) => {
	const [isApprove, setApprove] = useState<boolean>(false);
	const [stakeValue, setStakeValue] = useState<string>("");
	const [isLoadingStake, setLoadingStake] = useState<boolean>(false);
	const [isLoadingWithdraw, setLoadingWithdraw] = useState<boolean>(false);
	const [isLoadingApprove, setLoadingApprove] = useState<boolean>(false);

	//
	const handleStake = async () => {
		if (!address) return;
		if (!stakeValue) return;
		setLoadingStake(true);
		const res = await stakeToken(address, Number(stakeValue));
		setStakeValue("");
		if (res?.status) {
			getInfo();
		}
		setLoadingStake(false);
		setApprove(false);
		setNotify({
			display: true,
			text: res?.status ? "Staking successfully!" : "Error",
			severity: res?.status ? "success" : "error",
		});
	};
	//
	const handleWithdraw = async () => {
		if (staked === 0) return;
		if (!address) return;
		setLoadingWithdraw(true);
		const res = await withdrawToken(address);
		if (res?.status) {
			getInfo();
			setNotify({
				display: true,
				text: res?.status ? "Withdraw successfully!" : "Error",
				severity: res?.status ? "success" : "error",
			});
		}
		setLoadingWithdraw(false);
	};
	//
	const handleApprove = async () => {
		if (!address) return;
		if (!stakeValue) return;
		setLoadingApprove(true);
		const res = await approve(address, stakeValue);
		setLoadingApprove(false);
		setApprove(true);
		setNotify({
			display: true,
			text: res?.status ? "Approve successfully!" : "Error",
			severity: res?.status ? "success" : "error",
		});
	};
	// reset state when change account or change chain
	useEventEth({ address, setApprove });
	return (
		<>
			<Stack direction="row" justifyContent="center" my={1}>
				<TextField
					id="outlined-basic"
					variant="outlined"
					size="small"
					sx={{ width: "80%" }}
					value={stakeValue}
					onChange={(e) => setStakeValue(e.target.value)}
				/>
				<Button
					variant="contained"
					onClick={() => setStakeValue(balance?.toString() ?? "")}
				>
					all
				</Button>
			</Stack>
			<StackConfig>
				<LoadingButton
					variant="contained"
					sx={{
						width: "50%",
						borderRadius: 5,
						marginLeft: 1,
					}}
					loading={isLoadingApprove}
					onClick={handleApprove}
					disabled={isApprove}
				>
					Approve
				</LoadingButton>
				<LoadingButton
					variant="contained"
					sx={{
						width: "50%",
						borderRadius: 5,
						marginLeft: 1,
					}}
					disabled={!isApprove}
					loading={isLoadingStake}
					onClick={handleStake}
				>
					Stake
				</LoadingButton>
			</StackConfig>
			<LoadingButton
				loading={isLoadingWithdraw}
				onClick={handleWithdraw}
				variant="contained"
				sx={{ width: "100%", borderRadius: 5 }}
				disabled={staked && staked > 0 ? false : true}
			>
				Withdraw
			</LoadingButton>
		</>
	);
};

export default InputStake;
