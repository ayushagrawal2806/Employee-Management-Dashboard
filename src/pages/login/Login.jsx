import "./Login.css";
import { useContext, useState } from "react";
import employeeContext from "../../context/context";
import { LogIn, ShieldCheck, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(employeeContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@assignment.com" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
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
          <h1>ProAssignment</h1>
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
          <p>admin@assignment.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
