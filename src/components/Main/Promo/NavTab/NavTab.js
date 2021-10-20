import './NavTab.css';

function NavTab() {
    function handleClickAbout() {
        const component = document.querySelector('.aboutproject')
        const componentPosition = component.getBoundingClientRect().top;
        window.scrollBy({ top: componentPosition, behavior: 'smooth' });
      }

    function handleClickTechs() {
        const component = document.querySelector('.techs')
        const componentPosition = component.getBoundingClientRect().top;
        window.scrollBy({ top: componentPosition, behavior: 'smooth' });
    }

    function handleClickAboutMe() {
        const component = document.querySelector('.aboutme')
        const componentPosition = component.getBoundingClientRect().top;
        window.scrollBy({ top: componentPosition, behavior: 'smooth' });
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