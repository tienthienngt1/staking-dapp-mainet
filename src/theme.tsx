import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
	typography: {
		fontFamily: "'Lilita One', cursive",
		fontWeightBold: 400,
	},
	palette: {
		primary: {
			main: "#d68455",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
