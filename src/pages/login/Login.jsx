import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import axios from 'axios' 
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, authDispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    authDispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      authDispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      authDispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="loginPage">
    <Navbar />
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
      </div>
      {error && 
      <div className="errorMessage"> Error: {error.message} </div>
}
      <div className="createAccount">  <p> Not having an account? </p>
        <Link to='/register' style={{color: 'inherit', textDecoration: 'none'}}> 
        <button className="btn-createAccount"> Create account </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Login;