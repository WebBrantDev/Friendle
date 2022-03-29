import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();

  const signupHandler = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post("http://localhost:8080/signup", { username, email, password })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={signupHandler}>
        <input
          className="signup__input"
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="signup__input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="signup__input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="login__login-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
