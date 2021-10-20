import React, { useEffect } from 'react';
import './Register.css';
import logo from '../../images/logo_main.svg';
import { Link } from 'react-router-dom';

function Register({ handleRegister, errorFromApi, isErrorLoginFromApi, setErrorFromApi, isFormDisabled }) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPasword, setErrorPassword] = React.useState('');
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    if (isValidName && isValidEmail && isValidPassword === true) {
      setIsDisabled(false);
    }
    else setIsDisabled(true);
   }, [setIsDisabled, isValidName, isValidEmail, isValidPassword]) 
  
  const handleChangeName = (e) => {
    const target = e.target;
    setName(target.value);
    setErrorName(target.validationMessage);
    setIsValidName(target.checkValidity())
  }
    
  const handleChangeEmail = (e) => {
    const target = e.target;
    setEmail(target.value)
    setErrorEmail(target.validationMessage);
    setIsValidEmail(target.checkValidity());
  }

  const handleChangePassword = (e) => {
    const target = e.target;
    setPassword(target.value)
    setErrorPassword(target.validationMessage);
    setIsValidPassword(target.checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password);
  }

  useEffect(() => {
    setErrorFromApi('')
  }, [setErrorFromApi])

  const buttonClassName = `${(isValidName && isValidEmail && isValidPassword === true) ? "register__button" : "register__button_disable"}`;

      return (
          <section className="register">
              <div className="register__container">
                  <div className="register__top">
                    <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                    <h2 className="register__header">Добро пожаловать!</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="register__form" disabled={isFormDisabled ? "disabled" : ""}>
                    <p className="register__name">Имя</p>
                    <input value={name} onChange={handleChangeName} className="register__input" type="text" placeholder="" maxLength="10" minLength="2" required></input>
                    <span className="register__error">{errorName}</span>
                    <p className="register__name">E-mail</p>
                    <input value={email} onChange={handleChangeEmail} className="register__input" type="email" placeholder="" minLength="8" required></input>
                    <span className="register__error">{errorEmail}</span>
                    <p className="register__name">Пароль</p>
                    <input value={password} onChange={handleChangePassword} className="register__input" type="password" placeholder="" maxLength="10" minLength="8" required></input>
                    <span className="register__error">{errorPasword}</span>
                    {isErrorLoginFromApi ? (<p className="register__error">{errorFromApi}</p>) : ''}
                    <button className={buttonClassName} disabled={isDisabled ? "disabled" : ""}>Зарегистрироваться</button>
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