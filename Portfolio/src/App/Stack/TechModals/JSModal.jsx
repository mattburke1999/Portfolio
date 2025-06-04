import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../utils';

export default function JSModal() {

    const yellowStyle = { color: 'var(--yellow-color)' };

    const experience = calcExperienceYears('2022-12-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={yellowStyle}>JavaScript</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
                <h3>Desktop Apps</h3>
                <h3>Automations/Scripting</h3>
            </div>
            <h3 style={yellowStyle} className={modalStyles.underline}>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.yellowMarker}>Vanilla JS</li>
                <li className={modalStyles.yellowMarker}>React</li>
                <li className={modalStyles.yellowMarker}>Typescript</li>
                <li className={modalStyles.yellowMarker}>Vue</li>
                <li className={modalStyles.yellowMarker}>Next.js</li>
                <li className={modalStyles.yellowMarker}>and more . . .</li>
            </ul>
            <h3 style={yellowStyle} className={modalStyles.proj}>Projects</h3>
            <p>This (React.js)</p>
        </div>
    )
}