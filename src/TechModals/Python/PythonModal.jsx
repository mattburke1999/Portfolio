import pystyles from './PythonModal.module.css';
//WE will somehow open up the azFuncModal from the az func button

function azFuncButton(setIsPythonModalVisible, setIsAzFuncModalVisible) {
    setIsPythonModalVisible(false);
    setIsAzFuncModalVisible(true);
}

export default function PythonModal({ setIsPythonModalVisible, setIsAzFuncModalVisible }) {

    return (
        <div className={pystyles.modalContent}>
            <h1>Python</h1>
            <div className={pystyles.expert}>
                <h3>Web Development</h3>
                <h3>Data Science</h3>
                <h3>Automation</h3>
            </div>
            <p><strong>Experience:</strong> 4 years</p>
            <p>This is my preferred programming language that I am most comfortable with. </p>
            <h3>Tools & Technologies:</h3>
            <ul className={pystyles.tools}>
                <li className={pystyles.liTools}>Flask</li>
                <li className={pystyles.liTools}>SQLAlchemy</li>
                <li className={pystyles.liTools}>Selenium</li>
                <li className={pystyles.liTools}>BeautifulSoup</li>
                <li className={pystyles.liTools}>Tkinter</li>
                <li className={pystyles.liTools}>Pandas</li>
                <li className={pystyles.liTools}>NumPy</li>
                <li className={pystyles.liTools}>Scikit-learn</li>
                <li className={pystyles.liTools}>Matplotlib</li>
                <li className={pystyles.liTools}>Seaborn</li>
                <li className={`${pystyles.liTools} ${pystyles.azFunc}`}><button className={pystyles.azFunc} onClick={() => azFuncButton(setIsPythonModalVisible, setIsAzFuncModalVisible)}>Azure Functions</button></li>
                <li className={pystyles.liTools}>and more . . .</li>
            </ul>
            <h3 className={pystyles.proj}>Projects</h3>
            <button className={pystyles.projRef}>GarminMock Flask Website</button>
        </div>
    );
}