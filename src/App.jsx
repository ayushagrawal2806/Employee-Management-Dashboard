import { useContext } from "react";
import "./App.css";
import employeeContext from "./context/context";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const { isLoggedIn } = useContext(employeeContext);

  if (!isLoggedIn) {
    return <Login />;
  }

  return <Dashboard />;
}

export default App;
