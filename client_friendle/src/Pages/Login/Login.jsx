import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post("http://localhost:8080/login", { email, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        console.log(token);
      })
      .then(() => {
        navigate("/UserDashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={loginHandler}>
        <input
          className="login__input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="login__login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
