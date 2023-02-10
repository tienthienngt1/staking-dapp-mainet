import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import Body from "components/Body.component";
import Header from "components/Header.component";
import Container from "@mui/material/Container";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
	const width = useMedia("(max-width: 400px)");
	useEffect(() => {
		const ref = document.querySelector("meta[name='viewport']");
		ref?.setAttribute(
			"content",
			width
				? "width=400,shrink-to-fit=no, maximum-scale=0.8"
				: "initial-scale=1, width=device-width"
		);
	}, []);

	const [address, setAddress] = useState<string | undefined>();
	return (
		<>
			<Container maxWidth="xl">
				<Header address={address} setAddress={setAddress} />
				<Body address={address} setAddress={setAddress} />
			</Container>
			<Analytics />
		</>
	);
}
