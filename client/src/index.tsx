import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";
import "./index.css";

registerLicense(`${process.env.REACT_APP_LICENSE_SYNCFUSION}`);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
