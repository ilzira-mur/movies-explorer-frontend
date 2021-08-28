import React from 'react';

function Techs() {

    return(
        <section className="techs">
            <div className="techs__container">
                <h2 className="techs__header">Технологии</h2>
                <p className="techs__title">7 технологий</p>
                <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__stack">
                    <li className="techs__skil">HTML</li>
                    <li className="techs__skil techs__skil_type_small">CSS</li>
                    <li className="techs__skil">JS</li>
                    <li className="techs__skil techs__skil_type_small">React</li>
                    <li className="techs__skil">Git</li>
                    <li className="techs__skil techs__skil_type_small">Express.js</li>
                    <li className="techs__skil techs__skil_type_last">mongoDB</li>
                </ul>
            </div>
        </section>
    );
}

export default Techs