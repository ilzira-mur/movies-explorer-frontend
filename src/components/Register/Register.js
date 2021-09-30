import React, { useState } from 'react';
import './Register.css';
import logo from '../../images/logo_main.svg';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
    
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
    
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password);
  }


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
                    <p className="register__name">E-mail</p>
                    <input value={email} onChange={handleChangeEmail} className="register__input" type="email" placeholder="" required></input>
                    <p className="register__name">Пароль</p>
                    <input value={password} onChange={handleChangePassword} className="register__input" type="password" placeholder="" required></input>
                    <span className="register__error"></span>
                    <button className="link button register__button">Зарегистрироваться</button>
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