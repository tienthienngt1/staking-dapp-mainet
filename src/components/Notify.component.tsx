import { Snackbar, Alert } from "@mui/material";

type NotifyT = {
	display?: boolean;
	text?: string;
	severity?: "success" | "error";
	handleClose: () => void;
};

const Notify = ({ display, text, severity, handleClose }: NotifyT) => {
	if (!text) return <></>;
	return (
		<Snackbar
			open={display}
			onClose={handleClose}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
		>
			<Alert
				variant="filled"
				onClose={handleClose}
				severity={severity}
				sx={{ width: "100%" }}
			>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default Notify;
