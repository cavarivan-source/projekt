
import { Link } from "react-router-dom";
import "./signin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setFrom] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
const token =localStorage.getItem ("token");
  if (token) {
    navigate("/", { replace: true }); 
  }
}, [navigate]);

   
  const handleChange = (e) => {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://front2.edukacija.online/backend/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(form),
        },
      );



      const data = await response.json();
      if (data?.code) {
        setError("Wrong Email or password");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user_display_name);
      navigate("/", {replace: true});
      window.location.reload();

    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-none d-md-flex col-md-6 profile-left">
          <h1>ENJOY THE</h1>
          <img src="/img/header/logo_light.svg" alt="" />
        </div>
        <div className="col-md-6 profile-right">
          <h2>Welcome back</h2>
          <p>Lorem ipsum dolor sit amet.</p>
          <form onSubmit={handleLogin} className="signin-form">
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="button" className="btn btn-link p-0 text-start">Forgot password?</button>
            <button type="submit">Log in</button>
            <p>{error}</p>
          </form>
          <p className="text-center breakline">or</p>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;