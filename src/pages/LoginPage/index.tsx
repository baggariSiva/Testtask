import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function Login() {
  const [creds, setCreds] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  useEffect(() => {
    user && navigate("/home");
  }, [user, navigate]);

  const onChnageCreds = (event: {
    target: { value: string; name: string };
  }) => {
    const { value, name } = event.target;
    setCreds((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };
  const handleLogin = () => {
    if (creds.username === "admin" && creds.password === "admin") {
      localStorage.setItem("user", creds.username);
      navigate("/home");
    } else {
      setError("*Invalid Credentials");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="App">
      <div className="App_body">
        <h1>SignIn</h1>
        <input
          type="text"
          placeholder="User Name"
          name="username"
          value={creds.username}
          onChange={onChnageCreds}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={creds.password}
          onChange={onChnageCreds}
        />
        {error && <p>{error}</p>}
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
