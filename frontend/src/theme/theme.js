import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#FF6584",
    },
    background: {
      default: "#f4f6fa",
    },
  },
  typography: {
    fontFamily: "Inter, Arial",
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
