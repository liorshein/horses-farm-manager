import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { registerLicense } from "@syncfusion/ej2-base";
import "./index.css";

registerLicense(`${process.env.REACT_APP_LICENSE_SYNCFUSION}`);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
