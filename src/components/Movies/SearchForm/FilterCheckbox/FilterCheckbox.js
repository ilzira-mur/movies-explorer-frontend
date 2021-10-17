import { useRef } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onCheckbox, checkbox }) {
    const checked = useRef()

    function handleCheckbox() {
        onCheckbox();
    }

    return(
        <div className="filtercheckbox__container">
            <input onClick={handleCheckbox} type="checkbox" className="filtercheckbox__input" name="filtercheckbox" id="filtercheckbox" ref={checked} defaultChecked={checkbox}></input>
            <label className="link filtercheckbox__label" htmlFor="filtercheckbox">Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;