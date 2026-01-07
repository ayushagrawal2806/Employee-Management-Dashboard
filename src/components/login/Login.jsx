import "./Login.css";
import { useContext, useState } from "react";
import employeeContext from "./../../context/context";
import { LogIn, ShieldCheck, Mail, Lock } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("admin@promanage.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(employeeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@promanage.com" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("isAuthenticated", true);
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <ShieldCheck />
          </div>
          <h1>ProManage</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-button">
            <LogIn />
            Login to Dashboard
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials</p>
          <p>admin@promanage.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
