import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../utils';

export default function RustModal({scrollToProject, keyboardGamesRef}) {
    
    const orangeStyle = { color: 'var(--orange-color)' };

    const experience = calcExperienceYears('2024-01-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={orangeStyle}>rust</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
            </div>
            <h3 style={orangeStyle} className={modalStyles.underline}>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.orangeMarker}>Tokio</li>
                <li className={modalStyles.orangeMarker}>Warp framework</li>
            </ul>
            <h3 style={orangeStyle} className={modalStyles.proj}>Projects</h3>
            <div className={modalStyles.projects}>
                <button className={modalStyles.projRef} onClick={() => scrollToProject(keyboardGamesRef)}>Keyboard Games</button>
            </div>
        </div>
    )
}