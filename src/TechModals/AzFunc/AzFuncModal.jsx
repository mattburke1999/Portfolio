import azFuncstyles from './AzFuncModal.module.css';

export default function AzFuncModal() {
  return (
    <div className={azFuncstyles.modalContent}>
      <h1 className={azFuncstyles.title}>Azure Functions</h1>
      <p className={azFuncstyles.experience}><strong>Experience:</strong> 2 years</p>
      <p className={azFuncstyles.desc}>Worked on various Azure Functions for different tasks written in python</p>
      <ul className={azFuncstyles.tools}>
        <li className={azFuncstyles.liTools}>HTTP Triggers</li>
        <li className={azFuncstyles.liTools}>Timer Triggers</li>
        <li className={azFuncstyles.liTools}>Queue Triggers</li>
      </ul>
    </div>
  );
}