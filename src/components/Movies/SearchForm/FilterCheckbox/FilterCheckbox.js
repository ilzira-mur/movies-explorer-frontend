import './FilterCheckbox.css';

function FilterCheckbox({ onCheckbox, checkbox }) {

    function handleCheckbox() {
        onCheckbox();
    }

    return(
        <div className="filtercheckbox__container">
            <input onClick={handleCheckbox} defaultChecked={checkbox} type="checkbox" className="filtercheckbox__input" name="filtercheckbox" id="filtercheckbox"></input>
            <label className="link filtercheckbox__label" htmlFor="filtercheckbox">Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;