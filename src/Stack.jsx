import styles from './Stack.module.css';

function StackItem({ image, text }) {
  return (
    <div className={styles.stackItem}>
      <img className={styles.stackLogo} src={image} alt='stack-item' />
      <h3 className={styles.description}>{text}</h3>
    </div>
  );
}

function StackColumn({ children }) {
  return (
    <div className={styles.stackColumn}>
      {children}
    </div>
  );
}

export default function Stack({stackRef}) {
  return (
    <div className={styles.stackPage} ref={stackRef}>
      <h1 className={styles.stackTitle}>My Tech Stack</h1>
      <div className={styles.stackContainer}>
        <StackColumn >
          <StackItem image='./java-logo.png' text='Java' />
          <StackItem image='./css-logo.png' text='CSS' />
          <StackItem image='./js-logo.png' text='JavaScript' />
        </StackColumn>
        <StackColumn >
          <StackItem image='./html-logo.png' text='HTML' />
          <StackItem image='./sql-logo.png' text='SQL' />
          <StackItem image='./py-logo.png' text='Python' />
          <StackItem image='./cs-logo.png' text='C#' />
        </StackColumn>
        <StackColumn >
          <StackItem image='./git-logo.png' text='git' />
          <StackItem image='./r-logo.png' text='R' />
          <StackItem image='./az-func-logo.png' text='Azure Functions' />
        </StackColumn>
      </div>
    </div>
  );
}