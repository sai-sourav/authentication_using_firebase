import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import userContext from './context/user-context';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const userctx = useContext(userContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!userctx.isloggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        <Route path='/profile'>
          {userctx.isloggedIn && <UserProfile />}
          {!userctx.isloggedIn && <AuthPage />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
