import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import "./styles/index.less";

const rootElement = document.querySelector("#root") as HTMLElement;

createRoot(rootElement).render(<App />);
