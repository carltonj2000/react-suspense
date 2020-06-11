import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import App from "./lessons/112/app";
import * as serviceWorker from "./serviceWorker";

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
*/

ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
