import { Box, Stack, Button, Divider, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import StackConfig from "./StackConfig.component";
import { HeaderT } from "./Header.component";
import { connectWallet } from "func/connectWallet";
import { useEffect, useState } from "react";
import {
	getAmountStake,
	getRewardPool,
	harvestToken,
	getPoolStake,
} from "func/getInfoStaking";
import LoadingButton from "@mui/lab/LoadingButton";
import Harvest from "./Harvest.component";
import Grid from "@mui/material/Unstable_Grid2";
import { getBalance } from "func/getInfoToken";
import Notify from "./Notify.component";
import InputStake from "./InputStake.component";
const Body = ({ address, setAddress }: HeaderT) => {
	//state
	const [balance, setBalance] = useState<number | undefined>();
	const [poolStake, setPoolStake] = useState<number | undefined>();
	const [rewardPool, setRewardPool] = useState<number | undefined>();
	const [staked, setStaked] = useState<number | undefined>();
	const [isLoadingHarvest, setLoadingHarvest] = useState<boolean>(false);

	// notificate state for notify response
	const [notify, setNotify] = useState<
		| { display: boolean; text?: string; severity?: "success" | "error" }
		| undefined
	>();
	//
	const handleHarvest = async () => {
		if (staked === 0) return;
		if (!address) return;
		setLoadingHarvest(true);
		const res = await harvestToken(address);
		if (res?.status) {
			getInfo();
			setNotify({
				display: true,
				text: "Harvest successfully!",
				severity: "success",
			});
		}
		setLoadingHarvest(false);
	};
	// click to connect to wallet
	const handleConnect = async () => {
		const res = await connectWallet();
		if (res) setAddress(res);
	};

	// update info
	const getInfo = async () => {
		if (!address) return;
		const balance = await getBalance(address);
		setBalance(balance ?? 0);
		const pool = await getPoolStake();
		setPoolStake(pool ?? 0);
		const reward = await getRewardPool();
		setRewardPool(reward ?? 0);
		const staked = await getAmountStake(address);
		setStaked(staked ?? 0);
	};

	const handleCloseNotify = () => setNotify({ ...notify, display: false });
	useEffect(() => {
		if (!address) return;
		getInfo();
	}, [address]);

	return (
		<>
			<Grid
				container
				sx={{ display: "flex", justifyContent: "center" }}
				my={5}
			>
				<Grid md={6}></Grid>
				<Grid md={6}>
					<Box
						sx={{
							minWidth: 380,
							maxWidth: 500,
							padding: 2,
							display: "block",
							background: "#e25604",
							borderRadius: 5,
						}}
					>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Box
								component={"img"}
								src="logo.png"
								alt="logo"
								sx={{ width: "100px", height: "100px" }}
							/>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Typography variant="h6">
									RabbitCupid / RabbitCupid
								</Typography>
								<Typography variant="body2" gutterBottom>
									Not Locked
								</Typography>
								<Typography
									variant="subtitle1"
									sx={{
										background: "#dfc010",
										borderRadius: 5,
										fontWeight: "600",
										color: "#6f4112",
										paddingX: 2,
									}}
									gutterBottom
								>
									7 days
								</Typography>
								<Typography variant="caption" align="center">
									Withdrawing before 7 days, 20% fee will be
									deducted
								</Typography>
							</Box>
						</Stack>
						<StackConfig>
							<Typography>Stake</Typography>
							<Typography>RabbitCupid</Typography>
						</StackConfig>
						<StackConfig>
							<Typography>Earn</Typography>
							<Typography>RabbitCupid</Typography>
						</StackConfig>
						<StackConfig>
							<Typography>APY</Typography>
							<Typography>200%</Typography>
						</StackConfig>

						{/* START CONNECTED */}
						{address ? (
							<>
								<Typography gutterBottom>
									RabbitCupid{" "}
									<span style={{ opacity: "0.6" }}>
										{" "}
										&nbsp; EARNED
									</span>
								</Typography>
								<StackConfig>
									<Harvest address={address} />
									<LoadingButton
										variant={"contained"}
										sx={{ borderRadius: 5 }}
										disabled={
											staked && staked > 0 ? false : true
										}
										loading={isLoadingHarvest}
										onClick={handleHarvest}
									>
										Harvest
									</LoadingButton>
								</StackConfig>
								<Typography gutterBottom>
									RabbitCupid{" "}
									<span style={{ opacity: "0.6" }}>
										{" "}
										&nbsp; STACKED
									</span>
								</Typography>
								<StackConfig>
									<Typography>Available:</Typography>
									<Typography>
										<span style={{ color: "#137c33a3" }}>
											{balance?.toLocaleString() ?? 0}
										</span>{" "}
										&nbsp; RabbitCupid
									</Typography>
								</StackConfig>
								<StackConfig>
									<Typography>Staked:</Typography>
									<Typography>
										<span style={{ color: "#137c33a3" }}>
											{staked && staked.toLocaleString()}
										</span>{" "}
										&nbsp; RabbitCupid
									</Typography>
								</StackConfig>
								{/* ================ */}
								<InputStake
									address={address}
									getInfo={getInfo}
									staked={staked}
									balance={balance}
									setNotify={setNotify}
								/>
								{/* END CONNECTED */}
							</>
						) : (
							<Button
								variant="contained"
								sx={{ width: "100%", borderRadius: 5 }}
								onClick={handleConnect}
							>
								Connect Wallet
							</Button>
						)}
						{address && (
							<>
								<Divider sx={{ margin: "30px 0" }} />
								<StackConfig>
									<Typography>Total Staked</Typography>
									<Typography>
										<span
											style={{
												color: "#137c33a3",
											}}
										>
											{poolStake &&
												rewardPool &&
												Math.floor(
													poolStake - rewardPool
												).toLocaleString()}{" "}
										</span>
										RabbitCupid
									</Typography>
								</StackConfig>
								<StackConfig>
									<Typography>Rewards Pool</Typography>
									<Typography>
										<span
											style={{
												color: "#137c33a3",
											}}
										>
											{rewardPool &&
												Math.floor(
													rewardPool
												).toLocaleString()}{" "}
										</span>
										RabbitCupid
									</Typography>
								</StackConfig>
							</>
						)}
					</Box>
				</Grid>
			</Grid>
			<Notify
				handleClose={handleCloseNotify}
				display={notify?.display}
				text={notify?.text}
				severity={notify?.severity}
			/>
		</>
	);
};

export default Body;
