import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getProfit } from "func/getInfoStaking";

type Props = {
	address: string;
};

const Harvest = ({ address }: Props) => {
	const [staked, setStaked] = useState<number | undefined>();
	useEffect(() => {
		if (!address) return;
		const loopGetProfit = async () => {
			const res = await getProfit(address);
			setStaked(res);
		};
		loopGetProfit();
		const id = setInterval(() => {
			loopGetProfit();
		}, 3000);
		return () => {
			clearInterval(id);
		};
	}, [address]);
	return (
		<>
			<Typography sx={{ color: "#137c33a3" }}>
				{staked?.toLocaleString() ?? 0}
			</Typography>
		</>
	);
};

export default Harvest;
