import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "emotion-theming";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

// theme
const theme = {
  colors: {
    background: "#2F363D",
    panelBackground: "#434a50",
    boxShadow: "#121518",
    text: "#eee",
    fadedText: "#aaa"
  },
  shadows: ["2px 2px 10px #121518"]
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
