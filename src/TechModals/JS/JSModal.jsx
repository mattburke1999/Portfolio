import jsstyles from './JSModal.module.css';


export default function JSModal() {
  return (
  <div className={jsstyles.modalContent}>
    <h1>JavaScript</h1>
    <div className={jsstyles.expert}>
        <h3>Front-End Web Development</h3>
      </div>
      <p><strong>Experience:</strong> 1 year</p>
      <ul className={jsstyles.tools}>
        <li className={jsstyles.liTools}>basic front-end javascript</li>
        <li className={jsstyles.liTools}>basic React.js</li>
      </ul>
      <h3 className={jsstyles.proj}>Projects</h3>
      <p>This (React.js)</p>
  </div>
  )}