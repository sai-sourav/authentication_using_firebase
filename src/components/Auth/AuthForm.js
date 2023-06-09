import axios from "axios";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/user-context";

import classes from "./AuthForm.module.css";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";
let loggedintimer = "";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const userctx = useContext(userContext);
  const history = useHistory();

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
      try {
        setIsloading(true);
        clearTimeout(loggedintimer);
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
          {
            email: enteredemail,
            password: enteredpswd,
            returnSecureToken: true,
          }
        );
        e.target.reset();
        localStorage.setItem('token', response.data.idToken);
        history.replace('/profile');
        userctx.setIsloggedIn(true);
        loggedintimer = setTimeout(() => {
          userctx.setIsloggedIn(false);
        }, 300000)
      } catch (err) {
          alert(err.response.data.error.message);
      }
      setIsloading(false);
    } else {
      try {
        setIsloading(true);
        await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            email: enteredemail,
            password: enteredpswd,
            returnSecureToken: true,
          }
        );
        e.target.reset();
      } catch (err) {
          alert(err.response.data.error.message);
      }
      setIsloading(false);
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
          {!isLoading && <button type="submit">{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p style={{color: "white"}}>sending request...</p>}
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
