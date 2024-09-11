import "modern-normalize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { ROOT_CONTAINER } from "./const";

createRoot(document.querySelector(ROOT_CONTAINER)).render(
  <StrictMode>
    <App />
  </StrictMode>
);
