import styles from './PythonModal.module.css';


export default function PythonModal({ setModalVisible, }) {

    return (
        <div className={styles.modalContent}>
            <h1>Python</h1>
            <div className={styles.expert}>
                <h3>Web Development</h3>
                <h3>Data Science</h3>
                <h3>Automation</h3>
            </div>
            <p><strong>Experience:</strong> 4 years</p>
            <p>This is my preferred programming language that I am most comfortable with. </p>
            <h3>Tools & Technologies:</h3>
            <ul className={styles.tools}>
                <li className={styles.liTools}>Flask</li>
                <li className={styles.liTools}>SQLAlchemy</li>
                <li className={styles.liTools}>Selenium</li>
                <li className={styles.liTools}>BeautifulSoup</li>
                <li className={styles.liTools}>Tkinter</li>
                <li className={styles.liTools}>Pandas</li>
                <li className={styles.liTools}>NumPy</li>
                <li className={styles.liTools}>Scikit-learn</li>
                <li className={styles.liTools}>Matplotlib</li>
                <li className={styles.liTools}>Seaborn</li>
                <li className={`${styles.liTools} ${styles.azFunc}`}><button className={styles.azFunc} onClick={() => setModalVisible('azFunc')}>Azure Functions</button></li>
                <li className={styles.liTools}>and more . . .</li>
            </ul>
            <h3 className={styles.proj}>Projects</h3>
            <button className={styles.projRef}>GarminMock Flask Website</button>
        </div>
    );
}