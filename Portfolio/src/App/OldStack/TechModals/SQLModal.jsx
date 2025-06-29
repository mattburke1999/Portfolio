import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../utils';

export default function SQLModal() {

    const blueStyle = { color: 'var(--blue-color)' };

    const experience = calcExperienceYears('2020-08-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={blueStyle}>SQL</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <p className={modalStyles.desc}>I&apos;ve worked extensively with various SQL databases,</p>
            <p className={modalStyles.desc}>managing data effectively for different applications.</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Data Storage</h3>
                <h3>Data Manipulation</h3>
            </div>
            <h3 style={blueStyle} className={modalStyles.underline}>Databases:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.blueMarker}>PostgreSQL</li>
                <li className={modalStyles.blueMarker}>SQL Server</li>
                <li className={modalStyles.blueMarker}>MySQL</li>
                <li className={modalStyles.blueMarker}>SQLite</li>
                <li className={modalStyles.blueMarker}>Redis</li>
                <li className={modalStyles.blueMarker}>MongoDB</li>
            </ul>
        </div>
    )
}