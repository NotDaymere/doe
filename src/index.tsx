import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import { pdfjs } from "react-pdf";
import App from "./components/app";
import "./styles/index.less";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const rootElement = document.querySelector("#root") as HTMLElement;

createRoot(rootElement).render(<App />);
