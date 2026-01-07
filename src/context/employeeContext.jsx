import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import employeeContext from "./context";

const EmployeeContext = ({ children }) => {
  let isAuthenticated = localStorage.getItem("isAuthenticated");
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated === "true");
  return (
    <employeeContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </employeeContext.Provider>
  );
};
export default EmployeeContext;
