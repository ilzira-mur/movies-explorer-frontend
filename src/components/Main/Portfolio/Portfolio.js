import './Portfolio.css';
import linkArrow from '../../../images/link_arrow.svg'

function Portfolio() {

    return(
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__header">Портфолио</h2>
                <nav className="portfolio__links">
                    <a className="link portfolio__link" href="https://github.com/ilzira-mur/how-to-learn" target="_blank" rel="noreferrer">
                        <p className="portfolio__text">Статичный сайт</p>
                        <img className="portfolio__arrow" src={linkArrow} alt="ссылка"></img>
                    </a>
                    <a className="link portfolio__link" href="https://github.com/ilzira-mur/russian-travel" target="_blank" rel="noreferrer">
                        <p className="portfolio__text">Адаптивный сайт</p>
                        <img className="portfolio__arrow" src={linkArrow} alt="ссылка"></img>
                    </a>
                    <a className="link portfolio__link" href="https://github.com/ilzira-mur/react-mesto-api-full" target="_blank" rel="noreferrer">
                        <p className="portfolio__text">Одностраничное приложение</p>
                        <img className="portfolio__arrow" src={linkArrow} alt="ссылка"></img>
                    </a>
                </nav>
            </div>
        </section>
    );
}

export default Portfolio;