import modalStyles from './ModalStyles.module.css';

import { calcExperienceYears } from '../../../utils';

export default function CSharpModal({ setModalVisible, scrollToProject, todoRef, garminMockRef }) {

    const purpleStyle = {color: 'var(--purple-color)'};

    const experience = calcExperienceYears('2023-01-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={purpleStyle}>C#</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
                <h3>Desktop Apps</h3>
                <h3>Automations</h3>
            </div>
            <h3 style={purpleStyle} className={modalStyles.underline}>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={modalStyles.purpleMarker}>ASP.NET Core</li>
                <li className={modalStyles.purpleMarker}>MVC Core Web Apps</li>
                <li className={modalStyles.purpleMarker}>Entity Framework Core</li>
                <li className={modalStyles.purpleMarker}>LINQ</li>
                <li className={modalStyles.purpleMarker}>ASP.NET Web API</li>
                <li className={modalStyles.purpleMarker}><button className={modalStyles.projRef} onClick={() => setModalVisible('azFunc')}>Azure Functions</button></li>
                <li className={modalStyles.purpleMarker}>and more . . .</li>
            </ul>
            <h3 style={purpleStyle} className={modalStyles.proj}>Projects</h3>
            <div className={modalStyles.projects}>
                <button className={modalStyles.projRef} onClick={() => scrollToProject(garminMockRef)}>GarminMock .NET Website</button>
                <button className={modalStyles.projRef} onClick={() => scrollToProject(todoRef)}>Personal ToDo App</button>
            </div>
        </div>
    )
}