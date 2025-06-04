import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../utils';

export default function CSSModal() {
    
    const blueStyles = { color: 'var(--blue-color)' };

    const experience = calcExperienceYears('2022-06-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={blueStyles}>CSS</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
                <h3>UIs</h3>
                <h3>Styling</h3>
            </div>
        </div>
    )
}