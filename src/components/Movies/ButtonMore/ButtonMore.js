import './ButtonMore.css';

function ButtonMore({ onClick }) {

    return (
        <button onClick={onClick} className="link button buttonmore">Ещё</button>
    );
}

export default ButtonMore;