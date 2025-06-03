import styles from './CSharpModal.module.css'

export default function CSharpModal() {
    return (
        <div className={styles.modalContent}>
            <h1>C#</h1>
            <div className={styles.expert}>
                <h3>Web Development</h3>
            </div>
            <p><strong>Experience:</strong> 1 year</p>
            <h3>Tools & Technologies:</h3>
            <ul className={styles.tools}>
                <li>ASP.NET Core</li>
                <li>MVC Core Web Apps</li>
            </ul>
            <h3 className={styles.proj}>Projects</h3>
            <button className={styles.projRef}>GarminMock .NET Website</button>
        </div>
    )
}