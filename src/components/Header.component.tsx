import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { connectWallet } from "func/connectWallet";
import { useEventEth } from "../hooks/useEventEth";

export type HeaderT = {
	address: string | undefined;
	setAddress: React.Dispatch<React.SetStateAction<undefined | string>>;
};

const Header = ({ address, setAddress }: HeaderT) => {
	useEventEth({ address, setAddress });
	const handleConnect = async () => {
		const res = await connectWallet();
		if (res) setAddress(res);
	};

	return (
		<>
			<Stack direction={"row"} justifyContent={"flex-end"} p={2}>
				<Button variant="contained" onClick={handleConnect}>
					{address
						? `${address.substring(0, 4)}...${address.slice(-4)}`
						: `Connect Wallet`}
				</Button>
			</Stack>
			<Stack direction={"row"} justifyContent={"center"} my={2}>
				<Typography
					align="center"
					sx={{ typography: { md: "h2", xs: "h3" } }}
					className="title"
				>
					$RABBITCUPID STAKING POOL
				</Typography>
			</Stack>
		</>
	);
};

export default Header;
