import axios from "axios";
import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailref = useRef();
  const pswdref = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredemail = emailref.current.value;
    const enteredpswd = pswdref.current.value;

    if (isLogin) {
    } else {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            email: enteredemail,
            password: enteredpswd,
            returnSecureToken: true,
          }
        );
        const data = await response.json();
        localStorage.setItem("token", data.idToken);
        e.target.reset();
      } catch (err) {
          alert(err.response.data.error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={pswdref} />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
