import { useState } from "react";
import { useHistory } from "react-router";
import "./LoginPage.css";
import axios from "axios";

export const LoginPage = ({
  setIsLoggedIn,
  setUserName
}) => {

  const history = useHistory()

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogIn = (e) => {
    e.preventDefault();

    axios.get('https://61993e899022ea0017a7aded.mockapi.io/Avtorizatsia')
    .then(res => {
      const found = res.data.find((item) => item.Login === login && item.Password === password);
      if (found) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', found.Login);
        setUserName(found.Login);
        setIsLoggedIn(true);
        history.push('/');
      } else {
        alert('Введите правильный логин или пароль!');
      }
    })
    .catch(err => {
      console.err(err)
    })
  }

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Авторизация</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Логин"
            onChange={handleLoginChange}
            value={login}
            required
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
};
