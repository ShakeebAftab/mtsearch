import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

// Font
import "@fontsource/roboto";

// Material-UI
import { CssBaseline } from "@material-ui/core";
import { SearchContext } from "./context/SearchContext";

ReactDOM.render(
  <React.StrictMode>
    <SearchContext>
      <CssBaseline />
      <App />
    </SearchContext>
  </React.StrictMode>,
  document.getElementById("root")
);
