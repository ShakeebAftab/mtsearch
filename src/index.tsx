import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

// Font
import "@fontsource/roboto";

// Material-UI
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
