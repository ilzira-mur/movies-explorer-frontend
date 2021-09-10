import './AboutProject.css';

function AboutProject() {

    return(
        <section className="aboutproject">
            <div className="aboutproject__container">
                <h2 className="aboutproject__header">О проекте</h2>
                <div className="aboutproject__table">
                    <div className="aboutproject__text">
                        <h3 className="aboutproject__lead">Дипломный проект включал 5 этапов</h3>
                        <p className="aboutproject__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="aboutproject__text">
                        <h3 className="aboutproject__lead">На выполнение диплома ушло 5 недель</h3>
                        <p className="aboutproject__paragraph aboutproject__paragraph_type_small">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="aboutproject__line">
                    <div className="aboutproject__dataline">
                        <p className="aboutproject__block aboutproject__block_type_colour">1 неделя</p>
                        <p className="aboutproject__block aboutproject__block_large">4 недели</p>
                    </div>
                    <div className="aboutproject__dataline">
                        <p className="aboutproject__block aboutproject__block_colour">Back-end</p>
                        <p className="aboutproject__block aboutproject__block_large aboutproject__block_colour">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;