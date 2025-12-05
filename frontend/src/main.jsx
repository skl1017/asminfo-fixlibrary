import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BreadcrumbProvider>
      <App />
    </BreadcrumbProvider>
  </BrowserRouter>,
);
