import modalStyles from './ModalStyles.module.css';

export default function HtmlModal() {
    
    const orangeStyle = { color: 'var(--orange-color)' };

    return (
        <div className={modalStyles.modalContent}>
            <h1 style={orangeStyle}>HTML</h1>
            <p><strong>Experience:</strong> 2 years</p>
            <div className={modalStyles.lineBreak}></div>
            <div className={modalStyles.expert}>
                <h3>Web Development</h3>
                <h3>UIs</h3>
            </div>
        </div>
    )
}