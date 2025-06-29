import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../../utils';

export default function GitModal() {
    
    const orangeStyle = { color: 'var(--orange-color)' };

    const experience = calcExperienceYears('2019-12-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={orangeStyle}>git</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Version Control</h3>
                <h3>Collaboration</h3>
            </div>
            <h3 style={orangeStyle} className={modalStyles.underline}>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.orangeMarker}>GitHub</li>
                <li className={modalStyles.orangeMarker}>Azure Devops</li>
            </ul>
        </div>
    )
}