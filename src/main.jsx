import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EmployeeContext from "./context/employeeContext.jsx";

async function startApp() {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
  });

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <EmployeeContext>
        <App />
      </EmployeeContext>
    </StrictMode>
  );
}

startApp();
