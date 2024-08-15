import azFuncstyles from './AzFuncModal.module.css';
import PropTypes from 'prop-types';

export default function AzFuncModal({ setIsPythonModalVisible, setIsAzFuncModalVisible }) {
  const pythonModalButton = (setIsPythonModalVisible, setIsAzFuncModalVisible) => {
    setIsPythonModalVisible(true);
    setIsAzFuncModalVisible(false);
  }

  return (
    <div className={azFuncstyles.modalContent}>
      <h1 className={azFuncstyles.title}>Azure Functions</h1>
      <p className={azFuncstyles.experience}><strong>Experience:</strong> 2 years</p>
      <p className={azFuncstyles.desc}>Worked on various Azure Functions for different tasks written in <button className={azFuncstyles.python} onClick={() => pythonModalButton(setIsPythonModalVisible, setIsAzFuncModalVisible)}>Python</button></p>
      <ul className={azFuncstyles.tools}>
        <li className={azFuncstyles.liTools}>HTTP Triggers</li>
        <li className={azFuncstyles.liTools}>Timer Triggers</li>
        <li className={azFuncstyles.liTools}>Queue Triggers</li>
      </ul>
    </div>
  );
}

AzFuncModal.propTypes = {
  setIsPythonModalVisible: PropTypes.func.isRequired,
  setIsAzFuncModalVisible: PropTypes.func.isRequired
};