import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {

const history = useHistory();

const goBack = () => {
    history.goBack();
  };
 
    return (
        <section className="not-found">
            <h1 className="not-found__header">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <button onClick={goBack} className="link button not-found__link">Назад</button>
        </section>
    );
}

export default NotFound;