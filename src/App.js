import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { BlogPage } from './containers/BlogPage/BlogPage';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { NoMatch } from './containers/NoMatch/NoMatch';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  return (
    <Router>
      <div className='App'>
        <main>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/blog' />} />

            <Route exact path='/login'>
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            </Route>

            <Route exact path='/blog'>
              <BlogPage
                userName={userName}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>

            <Route exact path='/404'>
              <NoMatch />
            </Route>

            <Route
              path='*'
              render={({ location }) => {
                return (
                  <Redirect
                    to={{
                      pathname: '/404',
                      from: location,
                    }}
                  />
                );
              }}
            />
          </Switch>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
