import './Footer.css';

function Footer() {

    return(
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__data">
                    <p className="footer__year">&copy; {new Date().getFullYear()}</p>
                    <nav className="footer__links">
                        <a className="link footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        <a className="link footer__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
                        <a className="link footer__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;