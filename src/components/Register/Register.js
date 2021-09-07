import React from 'react';
import './Register.css';
import logo from '../../images/logo_main.svg';
import { Link } from 'react-router-dom';

function Register() {

      return (
          <section className="register">
              <div className="register__container">
                  <div className="register__top">
                    <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                    <h2 className="register__header">Добро пожаловать!</h2>
                  </div>
                  <form className="register__form">
                    <p className="register__name">Имя</p>
                    <input className="register__input"></input>
                    <p className="register__name">E-mail</p>
                    <input className="register__input"></input>
                    <p className="register__name">Пароль</p>
                    <input className="register__input"></input>
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