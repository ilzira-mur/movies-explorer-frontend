import React from 'react';
import './Register.css';
import logo from '../../images/logo_main.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

function Register({ handleRegister, errorFromApi, setErrorFromApi }) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPasword, setErrorPassword] = React.useState('');
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);

  useEffect(() => {
    setErrorFromApi('')
  }, [setErrorFromApi])
  
  const handleChangeName = (e) => {
    setName(e.target.value);
    const target = e.target;
    setErrorName(target.validationMessage);
    setIsValidName(target.checkValidity())
  }
    
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    const target = e.target;
    setErrorEmail(target.validationMessage);
    setIsValidEmail(target.checkValidity());
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    const target = e.target;
    setErrorPassword(target.validationMessage);
    setIsValidPassword(target.checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password);
  }

  const buttonClassName = `${(isValidName && isValidEmail && isValidPassword === true) ? "register__button" : "register__button_disable"}`;

      return (
          <section className="register">
              <div className="register__container">
                  <div className="register__top">
                    <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                    <h2 className="register__header">Добро пожаловать!</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="register__form">
                    <p className="register__name">Имя</p>
                    <input value={name} onChange={handleChangeName} className="register__input" type="text" placeholder="" required></input>
                    <span className="register__error">{errorName}</span>
                    <p className="register__name">E-mail</p>
                    <input value={email} onChange={handleChangeEmail} className="register__input" type="email" placeholder="" minLength="8" required></input>
                    <span className="register__error">{errorEmail}</span>
                    <p className="register__name">Пароль</p>
                    <input value={password} onChange={handleChangePassword} className="register__input" type="password" placeholder="" required></input>
                    <span className="register__error">{errorPasword}</span>
                    <button className={buttonClassName}>Зарегистрироваться</button>
                    <span className="register__error">{errorFromApi}</span>
                  </form>
                  <div className="register__signin">
                      <p className="register__text">Уже зарегистрированы?</p>
                      <Link to="/signin" className="link button register__link">Войти</Link>
                  </div>
              </div>
          </section>
      );
}

export default Register;