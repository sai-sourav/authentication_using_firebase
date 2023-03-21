import axios from 'axios';
import { useContext, useRef } from 'react';
import userContext from '../../context/user-context';
import classes from './ProfileForm.module.css';
const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

const ProfileForm = () => {
  const newpswdref = useRef();
  const userctx = useContext(userContext)
  const submitHandler = async (e) => {
    e.preventDefault();
    const newpswd = newpswdref.current.value;
    try{
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
          idToken : userctx.token,
          password : newpswd,
          returnSecureToken : true
        })
        console.log(response.data);
        userctx.settoken(response.data.idToken);
    }catch(err){
      console.log(err)
    }

    e.target.reset();
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newpswdref} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
