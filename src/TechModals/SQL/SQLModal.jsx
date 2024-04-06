import sqlstyles from './SQLModal.module.css';


export default function SQLModal() {
  return (
  <div className={sqlstyles.modalContent}>
    <h1>SQL</h1>
      <p><strong>Experience:</strong> 2 years</p>
      <p>I've worked extensively with various SQL databases, managing data effectively for different applications.</p>
      <h3>RDBMS:</h3>
      <ul className={sqlstyles.tools}>
        <li className={sqlstyles.liTools}>SQL Server</li>
        <li className={sqlstyles.liTools}>MySQL</li>
        <li className={sqlstyles.liTools}>PostgreSQL</li>
        <li className={sqlstyles.liTools}>SQLite</li>
      </ul>
  </div>
  )}