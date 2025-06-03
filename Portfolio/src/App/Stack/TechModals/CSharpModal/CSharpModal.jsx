import modalStyles from '../ModalStyles.module.css';
import styles from './CSharpModal.module.css';

export default function CSharpModal() {

    const purpleStyle = {color: 'var(--purple-color)'};
    return (
        <div className={modalStyles.modalContent}>
            <h1 style={purpleStyle}>C#</h1>
            <p><strong>Experience:</strong> 1 year</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3 style={purpleStyle}>Web Development</h3>
                <h3 style={purpleStyle}>Console Apps</h3>
                <h3 style={purpleStyle}>Automations</h3>
            </div>
            <h3>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={styles.listItem}>ASP.NET Core</li>
                <li className={styles.listItem}>MVC Core Web Apps</li>
                <li className={styles.listItem}>Entity Framework Core</li>
                <li className={styles.listItem}>LINQ</li>
                <li className={styles.listItem}>ASP.NET Web API</li>
                <li className={styles.listItem}>Azure Functions</li>
            </ul>
            <h3 className={modalStyles.proj}>Projects</h3>
            <button className={modalStyles.projRef}>GarminMock .NET Website</button>
        </div>
    )
}