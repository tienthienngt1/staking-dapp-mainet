import { ReactNode } from "react";
import { Stack } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { StackTypeMap } from "@mui/material/Stack";

type Props = {
	children: ReactNode;
	props?: OverridableComponent<StackTypeMap<{}, "div">>;
};

const StackConfig = ({ children, props }: Props) => {
	return (
		<Stack
			direction={"row"}
			justifyContent={"space-between"}
			{...props}
			py={1}
		>
			{children}
		</Stack>
	);
};

export default StackConfig;
