import modalStyles from '../ModalStyles.module.css';
import styles from './PythonModal.module.css';


export default function PythonModal({ setModalVisible, }) {

    const yellowStyle = {color: 'var(--yellow-color)'};

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={yellowStyle}>Python</h1>
            <p><strong>Experience:</strong> 4 years</p>
            <p>This is my preferred programming language that I am most comfortable with.</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3 style={yellowStyle}>Web Development</h3>
                <h3 style={yellowStyle}>Data Science</h3>
                <h3 style={yellowStyle}>Automation</h3>
            </div>
            <h3>Tools & Technologies:</h3>
            <ul className={modalStyles.tools}>
                <li className={styles.listItem}>Flask</li>
                <li className={styles.listItem}>Django</li>
                <li className={styles.listItem}>FastAPI</li>
                <li className={styles.listItem}>pywebview</li>
                <li className={styles.listItem}>Tkinter</li>
                <li className={styles.listItem}>Plotly</li>
                <li className={styles.listItem}>Pandas</li>
                <li className={styles.listItem}>NumPy</li>
                <li className={styles.listItem}>Scikit-learn</li>
                <li className={styles.listItem}>Matplotlib</li>
                <li className={`${styles.listItem} ${styles.azFunc}`}><button className={styles.azFunc} onClick={() => setModalVisible('azFunc')}>Azure Functions</button></li>
                <li className={styles.listItem}>and more . . .</li>
            </ul>
            <h3 style={yellowStyle} className={modalStyles.proj}>Projects</h3>
            <button className={modalStyles.projRef}>GarminMock Flask Website</button>
        </div>
    );
}