import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import userContext from '../../context/user-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const userctx = useContext(userContext);
  const history = useHistory();
  const logoutHandler = () => {
    userctx.setIsloggedIn(false);
    localStorage.removeItem('token');
    history.replace('/auth');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!userctx.isloggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {userctx.isloggedIn &&
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
