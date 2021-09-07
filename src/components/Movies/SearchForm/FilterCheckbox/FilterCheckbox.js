import './FilterCheckbox.css';

function FilterCheckbox() {

    return(
        <div className="filtercheckbox__container">
            <input type="checkbox" className="filtercheckbox__input" name="filtercheckbox" id="filtercheckbox"></input>
            <label className="link filtercheckbox__label" htmlFor="filtercheckbox">Короткометражки</label>

        </div>
    );
}

export default FilterCheckbox;