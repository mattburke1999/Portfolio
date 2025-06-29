import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../utils';

export default function AzFuncModal({setModalVisible}) {

    const yellowStyle = { color: 'var(--yellow-color)' };

    const experience = calcExperienceYears('2023-01-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={yellowStyle}>Azure Functions</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
                <h3>Automation</h3>
            </div>
            <h3 style={yellowStyle} className={modalStyles.underline}>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.yellowMarker}><button className={modalStyles.projRef} onClick={() => setModalVisible('csharp')}>C#</button></li>
                <li className={modalStyles.yellowMarker}><button className={modalStyles.projRef} onClick={() => setModalVisible('python')}>Python</button></li>
                <li className={modalStyles.yellowMarker}>HTTP Triggers</li>
                <li className={modalStyles.yellowMarker}>Timer Triggers</li>
                <li className={modalStyles.yellowMarker}>Queue Triggers</li>
            </ul>
        </div>
    )
}