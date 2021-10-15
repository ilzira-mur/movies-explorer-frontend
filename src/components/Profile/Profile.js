import React, { useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onNavigation, onSignOut, onUpdateUser, errorFromApi, isErrorLoginFromApi, setErrorFromApi, isSuccessfulNameChange, isFormDisabled }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorName, setErrorName] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const [isValidName, setIsValidName] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);

    useEffect(()=>{
        if(name === currentUser.name && email === currentUser.email){
            setIsValidName(false);
            setIsValidEmail(false);
        }
    }, [name, currentUser.name, email, currentUser.email])

    useEffect(() => {
    if (isValidName && isValidEmail === true) {
      setIsDisabled(false);
    }
    else setIsDisabled(true);
   }, [setIsDisabled, isValidName, isValidEmail])

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
      }, [currentUser]); 

    React.useEffect(() => {
        setErrorFromApi('')
    }, [setErrorFromApi])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: name,
          email: email,
        });
      } 

    function handleNameChange(e) {
        const target = e.target;
        setName(target.value);
        setErrorName(target.validationMessage);
        setIsValidName(target.checkValidity())
    }

    function handleEmailChange(e) {
        const target = e.target;
        setEmail(target.value);
        setErrorEmail(target.validationMessage);
        setIsValidEmail(target.checkValidity())
    }

    const buttonClassName = `${(isValidName && isValidEmail === true) ? "profile__button" : "profile__button_disable"}`;
    
    return (
        <section className="register">
                 <Header onNavigation={onNavigation}/>
                 <h2 className="profile__header">Привет, {name}!</h2>
                 <form onSubmit={handleSubmit} className="profile__info" disabled={isFormDisabled ? "disabled" : ""}>
                    <div className="profile__data">
                        <p className="profile__text">Имя</p>
                        <input className="profile__text profile__input" value={name || ''} onChange={handleNameChange} type="text" id ="profilename" name="profilename" maxLength="10" minLength="2" required />
                    </div>
                    <span className="register__error">{errorName}</span>
                    <div className="profile__data">
                        <p className="profile__text">E-mail</p>
                        <input className="profile__text profile__input" value={email || ''} onChange={handleEmailChange} type="email" id="profileemail" name="profileemail" required />
                    </div>
                    <span className="register__error">{errorEmail}</span>
                    <button type="submit" className={buttonClassName} disabled={isDisabled ? "disabled" : ""}>Редактировать</button>
                    {isErrorLoginFromApi ? (<p className="register__error">{errorFromApi}</p>) : ''}
                    {isSuccessfulNameChange ? (<p className="register__error">изменения имени и почты прошли успешно</p>) : ''}
                 </form>
                 <button className="link button profile__button profile__button_tupe_exit" onClick={onSignOut}>Выйти из аккаунта</button>
        </section>
    );
}

export default Profile;