import modalStyles from './ModalStyles.module.css';

// import { calcExperienceYears } from '../../utils';

export default function JavaModal() {
    
    const blueStyles = { color: 'var(--blue-color)' };

    const experience = '2 years'//calcExperienceYears('2022-06-01');

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={blueStyles}>Java</h1>
            <p><strong>Experience:</strong> {experience}</p>
            <p className={modalStyles.desc}>This was the first programming language I learned</p>
            <p className={modalStyles.desc}>about 9 yrs ago. I don't really use it much anymore though.</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Console Applications</h3>
            </div>
        </div>
    )
}