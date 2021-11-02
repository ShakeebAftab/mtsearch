import { createTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import { createContext, useState } from "react";

export const ThemeContextProvider = createContext<any>("");

export const ThemeContext = ({ children }: any) => {
  const [isDark, setIsDark] = useState(true);

  const lightTheme = createTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            display: "none",
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: red[800],
      },
      secondary: {
        main: "#fff",
      },
      background: {
        default: "#000",
        paper: "#242424",
      },
      text: {
        primary: "#fff",
        secondary: "#a8a8a8",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            display: "none",
          },
        },
      },
      MuiSwitch: {
        track: {
          "$checked$checked+&": {
            opacity: 0.3,
            backgroundColor: "#464646",
          },
        },
      },
    },
  });

  return (
    <ThemeContextProvider.Provider value={[isDark, setIsDark]}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContextProvider.Provider>
  );
};
