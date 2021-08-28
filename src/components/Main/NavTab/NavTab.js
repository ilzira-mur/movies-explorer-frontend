import React from 'react';

function NavTab() {
    function handleClickAbout() {
        const element = document.querySelector('.aboutproject')
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollBy({ top: elementPosition, behavior: 'smooth' });
      }

    function handleClickTechs() {
        const element = document.querySelector('.techs')
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollBy({ top: elementPosition, behavior: 'smooth' });
    }

    function handleClickAboutMe() {
        const element = document.querySelector('.aboutme')
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollBy({ top: elementPosition, behavior: 'smooth' });
    }


    return(
        <nav className="navtab">
            <button onClick={handleClickAbout} className="link button navtab__button">О проекте</button>
            <button onClick={handleClickTechs} className="link button navtab__button">Технологии</button>
            <button onClick={handleClickAboutMe} className="link button navtab__button">Студент</button>
        </nav>

    );
}

export default NavTab;