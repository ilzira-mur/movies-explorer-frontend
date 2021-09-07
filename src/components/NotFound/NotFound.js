import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    
    return (
        <section className="not-found">
            <h1 className="not-found__header">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link to="/" className="link not-found__link">Назад</Link>
        </section>
    );
}

export default NotFound;