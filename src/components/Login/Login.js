import React, { useEffect } from 'react';
import '../Register/Register.css';
import logo from '../../images/logo_main.svg';
import { Link } from 'react-router-dom';

function Login({ handleLogin, errorFromApi, isErrorLoginFromApi, setErrorFromApi, isFormDisabled }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPasword, setErrorPassword] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword === true) {
      setIsDisabled(false);
    }
    else setIsDisabled(true);
   }, [setIsDisabled, isValidEmail, isValidPassword])

  const handleChangeEmail = (e) => {
    const target = e.target;
    setEmail(target.value);
    setErrorEmail(target.validationMessage);
    setIsValidEmail(target.checkValidity())
  }

  const handleChangePassword = (e) => {
    const target = e.target;
    setPassword(target.value);
    setErrorPassword(target.validationMessage);
    setIsValidPassword(target.checkValidity());
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  useEffect(() => {
    setErrorFromApi('')
  }, [setErrorFromApi])

  const buttonClassName = `${(isValidEmail && isValidPassword === true) ? "register__button" : "register__button_disable"}`;

    return (
        <section className="register">
              <div className="register__container">
                  <div className="register__top">
                    <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                    <h2 className="register__header">Рады видеть!</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="register__form" disabled={isFormDisabled ? "disabled" : ""}>
                    <p className="register__name">E-mail</p>
                    <input value={email} onChange={handleChangeEmail} className="register__input" type="email" placeholder="" required></input>
                    <span className="register__error">{errorEmail}</span>
                    <p className="register__name">Пароль</p>
                    <input value={password} onChange={handleChangePassword} className="register__input" type="password" placeholder="" maxLength="10" minLength="8" required></input>
                    <span className="register__error">{errorPasword}</span>
                    {isErrorLoginFromApi ? (<span className="register__error">{errorFromApi}</span>) : ''}
                    <button className={buttonClassName} disabled={isDisabled ? "disabled" : ""}>Войти</button>
                  </form>
                  <div className="register__signin">
                      <p className="register__text">Ещё не зарегистрированы?</p>
                      <Link to="/signup" className="link button register__link">Регистрация</Link>
                  </div>
              </div>
          </section>
    );
}

export default Login;