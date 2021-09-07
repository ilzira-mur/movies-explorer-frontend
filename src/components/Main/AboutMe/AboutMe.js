import './AboutMe.css';
import aboutmePicture from '../../../images/aboutme_picture.jpg';

function AboutMe() {

    return(
        <section className="aboutme">
            <div className="aboutme__container">
                <h2 className="aboutme__header">Студент</h2>
                <div className="aboutme__block">
                    <div className="aboutme__column">
                        <h3 className="aboutme__name">Ильзира</h3>
                        <p className="aboutme__about">Фронтенд-разработчик, 29 лет</p>
                        <p className="aboutme__paragraph">Я родился и живу в .., закончил ... Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. Прохожу курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <nav className="aboutme__links">
                            <a className="link aboutme__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                            <a className="link aboutme__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
                        </nav>
                    </div>
                    <img className="aboutme__img" src={aboutmePicture} alt="Фото"></img>
                </div>
            </div>
        </section>

    );
}

export default AboutMe;