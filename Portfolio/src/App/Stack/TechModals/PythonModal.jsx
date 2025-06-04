import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../utils';

export default function PythonModal({ setModalVisible, }) {

    const yellowStyle = {color: 'var(--yellow-color)'};
    const experience = calcExperienceYears('2017-09-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={yellowStyle}>Python</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <p className={modalStyles.desc}>This is my preferred programming language that I am most comfortable with.</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
                <h3>Desktop Apps</h3>
                <h3>Data Science</h3>
                <h3>Automation</h3>
            </div>
            <h3 style={yellowStyle} className={modalStyles.underline}>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.yellowMarker}>Flask</li>
                <li className={modalStyles.yellowMarker}>Django</li>
                <li className={modalStyles.yellowMarker}>FastAPI</li>
                <li className={modalStyles.yellowMarker}>pywebview</li>
                <li className={modalStyles.yellowMarker}>Tkinter</li>
                <li className={modalStyles.yellowMarker}>Plotly</li>
                <li className={modalStyles.yellowMarker}>Pandas</li>
                <li className={modalStyles.yellowMarker}>NumPy</li>
                <li className={modalStyles.yellowMarker}>Scikit-learn</li>
                <li className={modalStyles.yellowMarker}>Matplotlib</li>
                <li className={modalStyles.yellowMarker}><button className={modalStyles.projRef} onClick={() => setModalVisible('azFunc')}>Azure Functions</button></li>
                <li className={modalStyles.yellowMarker}>and more . . .</li>
            </ul>
            <h3 style={yellowStyle} className={modalStyles.proj}>Projects</h3>
            <button className={modalStyles.projRef}>GarminMock Flask Website</button>
        </div>
    );
}